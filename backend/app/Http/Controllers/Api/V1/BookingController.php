<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\BusRoute;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class BookingController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Booking::with(['bus', 'route'])->latest();

        if ($request->user()->role !== 'admin') {
            $query->where('user_id', $request->user()->id);
        }

        return response()->json(['data' => $query->get()]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'bus_id' => ['required', 'exists:buses,id'],
            'bus_route_id' => ['required', 'exists:bus_routes,id'],
            'journey_date' => ['required', 'date'],
            'seats' => ['required', 'array', 'min:1', 'max:6'],
            'seats.*' => ['required', 'string', 'max:5'],
            'passenger_name' => ['required', 'string', 'max:255'],
            'passenger_phone' => ['required', 'string', 'max:30'],
            'passenger_email' => ['required', 'email', 'max:255'],
        ]);

        $route = BusRoute::where('id', $validated['bus_route_id'])
            ->where('bus_id', $validated['bus_id'])
            ->firstOrFail();

        if ($route->travel_date && $route->travel_date->format('Y-m-d') !== $validated['journey_date']) {
            return response()->json(['message' => 'This route is not available on the selected date.'], 422);
        }

        $validated['user_id'] = $request->user()->id;
        $validated['total_amount'] = count($validated['seats']) * $route->fare;
        $validated['booking_code'] = 'BG-' . strtoupper(Str::random(8));

        $booking = Booking::create($validated);

        return response()->json(['data' => $booking->load(['bus', 'route'])], 201);
    }

    public function cancel(Request $request, Booking $booking): JsonResponse
    {
        abort_unless(
            $request->user()->role === 'admin' || $booking->user_id === $request->user()->id,
            403,
        );

        if ($booking->status !== 'upcoming') {
            return response()->json(['message' => 'Only upcoming bookings can be cancelled.'], 422);
        }

        if (Carbon::parse($booking->journey_date)->isPast()) {
            return response()->json(['message' => 'Past bookings cannot be cancelled.'], 422);
        }

        $booking->update(['status' => 'cancelled']);

        return response()->json([
            'message' => 'Ticket cancelled successfully.',
            'data' => $booking->fresh()->load(['bus', 'route']),
        ]);
    }
}