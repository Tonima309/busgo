<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bus_routes', function (Blueprint $table) {
            $table->date('travel_date')->nullable()->after('to');
        });
    }

    public function down(): void
    {
        Schema::table('bus_routes', function (Blueprint $table) {
            $table->dropColumn('travel_date');
        });
    }
};