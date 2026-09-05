<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bus extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'number', 'type', 'total_seats'];

    public function routes(): HasMany
    {
        return $this->hasMany(BusRoute::class);
    }
}