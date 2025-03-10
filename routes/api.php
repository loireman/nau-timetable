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
        Route::get('teacher/{teacher}', [App\Http\Controllers\Api\DepartmentController::class, 'getTeachersSchedule'])->name('api.teacher.get');
        Route::get('group/{group}', [App\Http\Controllers\Api\DepartmentController::class, 'getGroup'])->name('api.group.get');

        Route::group([
            'prefix' => 'search',
            'middleware' => ['api'],
        ], function () {
            // Search routes here
            Route::get('teacher/{name?}', [App\Http\Controllers\Api\SearchController::class, 'getTeacherByName'])->name('api.teacher.find');
            Route::get('group/{name?}', [App\Http\Controllers\Api\SearchController::class, 'getGroupByName'])->name('api.group.find');
        });

        Route::get('fetchDep', function() {
            return \App\Models\Departments::pluck('name')->toArray();
        })->name('api.fetch.dep');

        Route::post('parseDep', [App\Http\Controllers\Api\ParseController::class, 'parseDep'])->name('api.parse.dep');
        Route::post('parseGroup', [App\Http\Controllers\Api\ParseController::class, 'parseGroup'])->name('api.parse.group');
        Route::post('parseTimetable', [App\Http\Controllers\Api\ParseController::class, 'parseTimetable'])->name('api.parse.timetable');

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
