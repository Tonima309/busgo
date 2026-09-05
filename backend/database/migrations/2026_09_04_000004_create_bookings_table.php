<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_code')->unique();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('bus_id')->constrained()->restrictOnDelete();
            $table->foreignId('bus_route_id')->constrained('bus_routes')->restrictOnDelete();
            $table->date('journey_date');
            $table->json('seats');
            $table->unsignedInteger('total_amount');
            $table->string('status')->default('upcoming');
            $table->string('passenger_name');
            $table->string('passenger_phone', 30);
            $table->string('passenger_email');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};