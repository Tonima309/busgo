<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Bus;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BusController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $buses = Bus::with('routes')
            ->when($request->filled('from'), fn ($query) => $query->whereHas('routes', fn ($route) => $route->where('from', $request->string('from'))))
            ->when($request->filled('to'), fn ($query) => $query->whereHas('routes', fn ($route) => $route->where('to', $request->string('to'))))
            ->when($request->filled('date'), fn ($query) => $query->whereHas('routes', fn ($route) => $route->where(fn ($dateQuery) => $dateQuery->whereNull('travel_date')->orWhereDate('travel_date', $request->date('date')))))
            ->get();

        $travelDate = $request->date('date');
        $buses->each(function ($bus) use ($travelDate) {
            $bus->routes->each(function ($route) use ($bus, $travelDate) {
                $bookings = $route->bookings()
                    ->where('status', '!=', 'cancelled')
                    ->when($travelDate, fn ($query) => $query->whereDate('journey_date', $travelDate))
                    ->get();
                $bookedSeatIds = $bookings->flatMap(fn ($booking) => $booking->seats ?? [])->unique()->values()->all();
                $bookedSeats = count($bookedSeatIds);

                $route->setAttribute('booked_seats', $bookedSeats);
                $route->setAttribute('booked_seat_ids', $bookedSeatIds);
                $route->setAttribute('available_seats', max($bus->total_seats - $bookedSeats, 0));
                $route->setAttribute('total_seats', $bus->total_seats);
            });
        });

        return response()->json(['data' => $buses]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'number' => ['required', 'string', 'max:50', 'unique:buses,number'],
            'type' => ['required', 'string', 'max:100'],
            'total_seats' => ['required', 'integer', 'min:1', 'max:200'],
            'route_from' => ['required', 'string', 'max:255'],
            'route_to' => ['required', 'string', 'max:255'],
            'travel_date' => ['nullable', 'date'],
            'departure' => ['required', 'date_format:H:i'],
            'arrival' => ['required', 'date_format:H:i'],
            'fare' => ['required', 'integer', 'min:0'],
        ]);

        $bus = DB::transaction(function () use ($validated) {
            $bus = Bus::create([
                'name' => $validated['name'],
                'number' => $validated['number'],
                'type' => $validated['type'],
                'total_seats' => $validated['total_seats'],
            ]);

            $bus->routes()->create([
                'from' => $validated['route_from'],
                'to' => $validated['route_to'],
                'travel_date' => $validated['travel_date'] ?? null,
                'departure' => $validated['departure'],
                'arrival' => $validated['arrival'],
                'fare' => $validated['fare'],
            ]);

            return $bus->load('routes');
        });

        return response()->json(['data' => $bus], 201);
    }

    public function update(Request $request, Bus $bus): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'number' => ['required', 'string', 'max:50', 'unique:buses,number,' . $bus->id],
            'type' => ['required', 'string', 'max:100'],
            'total_seats' => ['required', 'integer', 'min:1', 'max:200'],
            'route_from' => ['sometimes', 'required', 'string', 'max:255'],
            'route_to' => ['sometimes', 'required', 'string', 'max:255'],
            'travel_date' => ['nullable', 'date'],
            'departure' => ['sometimes', 'required', 'date_format:H:i'],
            'arrival' => ['sometimes', 'required', 'date_format:H:i'],
            'fare' => ['sometimes', 'required', 'integer', 'min:0'],
        ]);

        $bus->update(collect($validated)->only([
            'name', 'number', 'type', 'total_seats',
        ])->all());

        if (isset($validated['route_from'])) {
            $bus->routes()->updateOrCreate(
                ['id' => $bus->routes()->first()?->id],
                [
                    'from' => $validated['route_from'],
                    'to' => $validated['route_to'],
                    'travel_date' => $validated['travel_date'] ?? null,
                    'departure' => $validated['departure'],
                    'arrival' => $validated['arrival'],
                    'fare' => $validated['fare'],
                ],
            );
        }

        return response()->json(['data' => $bus->fresh('routes')]);
    }

    public function destroy(Bus $bus): JsonResponse
    {
        if ($bus->routes()->exists()) {
            return response()->json(['message' => 'Delete this bus route first.'], 422);
        }

        $bus->delete();

        return response()->json(['message' => 'Bus deleted successfully']);
    }
}