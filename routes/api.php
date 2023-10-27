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

Route::group([
    'namespace'  => 'App\Http\Controllers\Api',
    'prefix'     => 'v1',
], function()
    {
        Route::get('teachers', [App\Http\Controllers\Api\DepartmentController::class, 'getTeachers']);
        Route::get('teachers/{teacher}', [App\Http\Controllers\Api\DepartmentController::class, 'getTeachersSchedule']);

        Route::get('group/{group}', [App\Http\Controllers\Api\DepartmentController::class, 'getGroup']);

        Route::group([
            'prefix' => 'search',
            'middleware' => ['api'],
        ], function()
        {
            // Search routes here
            Route::get('group/{name?}', [App\Http\Controllers\Api\SearchController::class, 'getGroupByName']);
        });
    }
);
