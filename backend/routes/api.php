<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\HealthCheckController;
use App\Http\Controllers\Api\V1\SettingController;
use App\Http\Controllers\Api\V1\BookingController;
use App\Http\Controllers\Api\V1\BusController;
use App\Http\Controllers\Api\V1\BusRouteController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\DashboardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('v1')->group(function () {
    Route::get('/health', HealthCheckController::class);
    Route::get('/buses', [BusController::class, 'index']);
    Route::get('/routes', [BusRouteController::class, 'index']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/bookings', [BookingController::class, 'index']);
        Route::post('/bookings', [BookingController::class, 'store']);
        Route::patch('/bookings/{booking}/cancel', [BookingController::class, 'cancel']);
        Route::get('/settings', [SettingController::class, 'index']);
        Route::put('/settings', [SettingController::class, 'update']);

        Route::middleware('can:manage-bus-data')->group(function () {
            Route::get('/dashboard', DashboardController::class);
            Route::post('/buses', [BusController::class, 'store']);
            Route::put('/buses/{bus}', [BusController::class, 'update']);
            Route::delete('/buses/{bus}', [BusController::class, 'destroy']);
            Route::post('/routes', [BusRouteController::class, 'store']);
            Route::put('/routes/{route}', [BusRouteController::class, 'update']);
            Route::delete('/routes/{route}', [BusRouteController::class, 'destroy']);
            Route::get('/users', [UserController::class, 'index']);
            Route::post('/users', [UserController::class, 'store']);
            Route::put('/users/{user}', [UserController::class, 'update']);
            Route::delete('/users/{user}', [UserController::class, 'destroy']);
        });
    });

    Route::prefix('auth')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);

        Route::middleware('auth:sanctum')->group(function () {
            Route::get('/me', [AuthController::class, 'me']);
            Route::post('/logout', [AuthController::class, 'logout']);
            Route::get('/settings', [SettingController::class, 'index']);
            Route::put('/settings', [SettingController::class, 'update']);
        });
    });
});

