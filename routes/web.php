<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ExcelController;
use App\Http\Controllers\Api\LogController;
use App\Http\Controllers\Api\OrderController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function () {
    Route::get('/auth/user', [AuthController::class, 'user']);
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);

    Route::post('/excel/upload', [ExcelController::class, 'upload']);

    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::put('/orders/{id}', [OrderController::class, 'update']);
    Route::delete('/orders/{id}', [OrderController::class, 'destroy']);

    Route::get('/logs', [LogController::class, 'index']);
    Route::get('/logs/{id}', [LogController::class, 'show']);
});

Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
});

Route::get('/{any}', function () {
    return view('app');
})->where('any', '^(?!admin).*$');
