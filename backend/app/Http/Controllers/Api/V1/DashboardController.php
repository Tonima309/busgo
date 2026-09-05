<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Bus;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $today = Carbon::today();
        $monthlyRevenue = Booking::query()
            ->selectRaw('MONTH(created_at) as month, SUM(total_amount) as revenue')
            ->whereYear('created_at', $today->year)
            ->groupByRaw('MONTH(created_at)')
            ->pluck('revenue', 'month');

        return response()->json([
            'data' => [
                'stats' => [
                    'buses' => Bus::count(),
                    'bookings' => Booking::count(),
                    'passengers' => User::where('role', '!=', 'admin')->count(),
                    'revenue' => (int) Booking::sum('total_amount'),
                    'today_bookings' => Booking::whereDate('created_at', $today)->count(),
                    'today_revenue' => (int) Booking::whereDate('created_at', $today)->sum('total_amount'),
                ],
                'monthly_revenue' => collect(range(1, 12))->map(fn ($month) => [
                    'month' => $month,
                    'revenue' => (int) ($monthlyRevenue[$month] ?? 0),
                ])->values(),
                'recent_bookings' => Booking::with(['bus', 'route'])
                    ->latest()
                    ->limit(5)
                    ->get(),
            ],
        ]);
    }
}