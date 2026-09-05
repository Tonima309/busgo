<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    protected $fillable = [
        'booking_code', 'user_id', 'bus_id', 'bus_route_id', 'journey_date',
        'seats', 'total_amount', 'status', 'passenger_name', 'passenger_phone',
        'passenger_email',
    ];

    protected $casts = ['seats' => 'array', 'journey_date' => 'date'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function bus(): BelongsTo
    {
        return $this->belongsTo(Bus::class);
    }

    public function route(): BelongsTo
    {
        return $this->belongsTo(BusRoute::class, 'bus_route_id');
    }
}