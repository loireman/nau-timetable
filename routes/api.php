<?php

use App\Http\Controllers\Api\CartApiController;
use App\Http\Controllers\OrderApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'cart',
], function() {
    Route::get('/{id}', [CartApiController::class, 'index'])->name('getCart');
    Route::post('/', [CartApiController::class, 'addProduct'])->name('addToCart');
    Route::put('/{client_id}/{product_id}', [CartApiController::class, 'updateProduct'])->name('editInCart');
    Route::delete('/{client_id}/{product_id}', [CartApiController::class, 'deleteProduct'])->name('removeFromCart');
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'orders',
], function() {
    Route::get('/{id}', [OrderApiController::class, 'index'])->name('getOrder');
    Route::post('/', [OrderApiController::class, 'addOrder'])->name('addOrder');
});
