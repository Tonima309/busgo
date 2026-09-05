<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\BusRoute;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BusRouteController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return response()->json(['data' => BusRoute::with('bus')
            ->when($request->filled('date'), fn ($query) => $query->whereNull('travel_date')->orWhereDate('travel_date', $request->date('date')))
            ->get()]);
    }

    public function store(Request $request): JsonResponse
    {
        $route = BusRoute::create($request->validate([
            'bus_id' => ['required', 'exists:buses,id'],
            'from' => ['required', 'string', 'max:255'],
            'to' => ['required', 'string', 'max:255'],
            'travel_date' => ['nullable', 'date'],
            'departure' => ['required', 'date_format:H:i'],
            'arrival' => ['required', 'date_format:H:i'],
            'fare' => ['required', 'integer', 'min:0'],
        ]));

        return response()->json(['data' => $route->load('bus')], 201);
    }

    public function update(Request $request, BusRoute $route): JsonResponse
    {
        $route->update($request->validate([
            'bus_id' => ['required', 'exists:buses,id'],
            'from' => ['required', 'string', 'max:255'],
            'to' => ['required', 'string', 'max:255'],
            'travel_date' => ['nullable', 'date'],
            'departure' => ['required', 'date_format:H:i'],
            'arrival' => ['required', 'date_format:H:i'],
            'fare' => ['required', 'integer', 'min:0'],
        ]));

        return response()->json(['data' => $route->load('bus')]);
    }

    public function destroy(BusRoute $route): JsonResponse
    {
        if ($route->bookings()->exists()) {
            return response()->json(['message' => 'This route has bookings and cannot be deleted.'], 422);
        }

        $route->delete();

        return response()->json(['message' => 'Route deleted successfully']);
    }
}