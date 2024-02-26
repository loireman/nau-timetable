<?php

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

Route::group(
    [
        'namespace'  => 'App\Http\Controllers\Api',
        'prefix'     => 'v1',
    ],
    function () {
        Route::get('teacher/{teacher}', [App\Http\Controllers\Api\DepartmentController::class, 'getTeachersSchedule']);
        Route::get('group/{group}', [App\Http\Controllers\Api\DepartmentController::class, 'getGroup']);

        Route::group([
            'prefix' => 'search',
            'middleware' => ['api'],
        ], function () {
            // Search routes here
            Route::get('teacher/{name?}', [App\Http\Controllers\Api\SearchController::class, 'getTeacherByName']);
            Route::get('group/{name?}', [App\Http\Controllers\Api\SearchController::class, 'getGroupByName']);
        });
    }
);

Route::group(
    [
        'namespace'  => 'App\Http\Controllers\Api',
        'prefix'     => 'v1/auth',
    ],
    function () {
        Route::post('/register', [App\Http\Controllers\Api\ApiRegisteredUserController::class, 'store'])
            ->middleware('guest')
            ->name('register');

        Route::post('/login', [App\Http\Controllers\Api\ApiAuthenticatedSessionController::class, 'store'])
            ->name('login');

        Route::get('/check-login', [App\Http\Controllers\Api\ApiAuthenticatedSessionController::class, 'checkLogin']);

        Route::middleware('check.api')->get('/user', function (Request $request) {
            return response([
                'status' => 200,
                'name' => $request->user->name,
            ]);
        });

        Route::post('/logout', [App\Http\Controllers\Api\ApiAuthenticatedSessionController::class, 'destroy'])
            ->middleware('auth:sanctum')
            ->name('logout');
    }
);

Route::get('google/login/url', [App\Http\Controllers\Api\GoogleController::class, 'getAuthUrl']);
Route::get('google/auth/login', [App\Http\Controllers\Api\GoogleController::class, 'postLogin']);
