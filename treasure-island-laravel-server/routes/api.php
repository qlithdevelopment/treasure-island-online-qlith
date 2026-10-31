<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PropertyController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

Route::get('/running', function () {
    return 'Treasure Island Online server is running...';
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/contacts', [ContactController::class, 'store']);
Route::get('/properties', [PropertyController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::get('/contacts', [ContactController::class, 'index']);
    Route::get('/contacts/{id}', [ContactController::class, 'show']);
    Route::put('/contacts/{id}', [ContactController::class, 'update']);
    Route::patch('/contacts/{id}', [ContactController::class, 'update']);
    Route::delete('/contacts/{id}', [ContactController::class, 'destroy']);

    Route::post('/properties', [PropertyController::class, 'store']);
    Route::get('/properties/{id}', [PropertyController::class, 'show']);
    Route::put('/properties/{id}', [PropertyController::class, 'update']);
    Route::patch('/properties/{id}', [PropertyController::class, 'update']);
    Route::delete('/properties/{id}', [PropertyController::class, 'destroy']);
});

Route::get('/clear-cache', function () {
    Artisan::call('cache:clear');
    Artisan::call('config:clear');
    Artisan::call('route:clear');
    Artisan::call('view:clear');

    return response()->json([
        'success' => true,
        'message' => 'Application cache cleared successfully'
    ]);
});
