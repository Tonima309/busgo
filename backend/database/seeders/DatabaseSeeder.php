<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Bus;
use App\Models\BusRoute;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => env('ADMIN_EMAIL', 'admin@busgo.com')],
            [
                'name' => 'BusGo Administrator',
                'phone' => env('ADMIN_PHONE', '01000000000'),
                'role' => 'admin',
                'password' => Hash::make(env('ADMIN_PASSWORD', 'Admin@12345')),
            ],
        );

        $busData = [
            ['name' => 'Shyamoli Paribahan', 'number' => 'DH-3421', 'type' => 'AC', 'total_seats' => 40],
            ['name' => 'Hanif Enterprise', 'number' => 'DH-2218', 'type' => 'Non-AC', 'total_seats' => 52],
            ['name' => 'Green Line', 'number' => 'DH-5543', 'type' => 'AC Sleeper', 'total_seats' => 28],
            ['name' => 'Soudia Eagle', 'number' => 'DH-4432', 'type' => 'AC', 'total_seats' => 40],
            ['name' => 'TR Travels', 'number' => 'CT-3122', 'type' => 'Non-AC', 'total_seats' => 52],
        ];

        foreach ($busData as $data) {
            Bus::updateOrCreate(['number' => $data['number']], $data);
        }

        $routes = [
            ['bus' => 'DH-3421', 'from' => 'Dhaka', 'to' => 'Chittagong', 'departure' => '07:00', 'arrival' => '12:30', 'fare' => 650],
            ['bus' => 'DH-2218', 'from' => 'Dhaka', 'to' => 'Sylhet', 'departure' => '08:30', 'arrival' => '14:00', 'fare' => 420],
            ['bus' => 'DH-5543', 'from' => 'Dhaka', 'to' => "Cox's Bazar", 'departure' => '10:00', 'arrival' => '15:30', 'fare' => 900],
            ['bus' => 'DH-4432', 'from' => 'Dhaka', 'to' => 'Chittagong', 'departure' => '12:30', 'arrival' => '18:00', 'fare' => 680],
            ['bus' => 'CT-3122', 'from' => 'Chittagong', 'to' => "Cox's Bazar", 'departure' => '15:00', 'arrival' => '20:30', 'fare' => 380],
        ];

        foreach ($routes as $route) {
            $bus = Bus::where('number', $route['bus'])->firstOrFail();
            BusRoute::updateOrCreate(
                ['bus_id' => $bus->id, 'from' => $route['from'], 'to' => $route['to']],
                ['departure' => $route['departure'], 'arrival' => $route['arrival'], 'fare' => $route['fare']],
            );
        }
    }
}
