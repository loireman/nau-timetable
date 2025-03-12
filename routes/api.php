<?php

use App\Http\Controllers\FrontController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

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
        Route::get('teacher/{teacher}', function ($teacher) {
            $cacheKey = 'teacher_schedule_' . $teacher;

            $data = Cache::remember($cacheKey, 604800, function () use ($teacher) {
                return app(App\Http\Controllers\Api\DepartmentController::class)->getTeachersSchedule($teacher);
            });

            return response()->json($data)->header('Cache-Control', 'public, max-age=604800, must-revalidate');
        })->name('api.teacher.get');

        Route::get('group/{group}', function ($group) {
            $cacheKey = 'group_data_' . $group;

            $data = Cache::remember($cacheKey, 604800, function () use ($group) {
                return app(App\Http\Controllers\Api\DepartmentController::class)->getGroup($group);
            });

            return response()->json($data)->header('Cache-Control', 'public, max-age=604800, must-revalidate');
        })->name('api.group.get');

        Route::group([
            'prefix' => 'search',
            'middleware' => ['api'],
        ], function () {
            Route::get('teacher/{name?}', function ($name = null) {
                $cacheKey = 'search_teacher_' . ($name ?? 'all');

                $data = Cache::remember($cacheKey, 604800, function () use ($name) {
                    return app(App\Http\Controllers\Api\SearchController::class)->getTeacherByName($name);
                });

                return response()->json($data)->header('Cache-Control', 'public, max-age=604800, must-revalidate');
            })->name('api.teacher.find');

            Route::get('group/{name?}', function ($name = null) {
                $cacheKey = 'search_group_' . ($name ?? 'all');

                $data = Cache::remember($cacheKey, 604800, function () use ($name) {
                    return app(App\Http\Controllers\Api\SearchController::class)->getGroupByName($name);
                });

                return response()->json($data)->header('Cache-Control', 'public, max-age=604800, must-revalidate');
            })->name('api.group.find');
        });

        Route::get('fetchDep', function () {
            return \App\Models\Departments::pluck('name')->toArray();
        })->name('api.fetch.dep');

        Route::post('parseDep', [App\Http\Controllers\Api\ParseController::class, 'parseDep'])->name('api.parse.dep');
        Route::post('parseGroup', [App\Http\Controllers\Api\ParseController::class, 'parseGroup'])->name('api.parse.group');
        Route::post('parseTimetable', [App\Http\Controllers\Api\ParseController::class, 'parseTimetable'])->name('api.parse.timetable');
    }
);

Route::post('/webhook', FrontController::class);