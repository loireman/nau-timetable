<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group([
    'namespace'  => 'App\Http\Controllers\Admin',
    'prefix'     => 'admin',
    'middleware' => ['auth', 'can:admin page'],
], function () {
    Route::get('/', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin');
    Route::resource('permission', 'PermissionController');
    Route::resource('role', 'RoleController');
    Route::resource('user', 'UserController');
    Route::resource('config', 'ConfigController');
    Route::resource('department', 'DepartmentController');
    Route::resource('stream', 'StreamController');
    Route::resource('group', 'GroupController');
    Route::resource('timetable', 'TimetableController');
});

Route::get('/', function () {
    return Inertia::render('Welcome1', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/oauth.html', function () {
    $code = "";
    if (request()->has('code')) {
        $code = request()->input('code');
    }

    return Redirect::to('/api/google/auth/login?code=' . $code);
});

Route::get('/test', function () {
    $globalAlert = config('config.global_alert');

    return Inertia::render('Welcome', ['globalAlert' => $globalAlert]);
})->name('test1');

Route::group([
    'prefix'     => 'timetable',
], function () {
    Route::get('/', function () {
        $group = "";
        if (request()->has('group')) {
            $group = request()->input('group');
        }
        return Inertia::render('Timetable/Group', compact('group'));
    })->name('dashboard');

    Route::get('teacher', function () {
        $teacher = "";
        if (request()->has('teacher')) {
            $teacher = request()->input('teacher');
        }
        return Inertia::render('Timetable/Teacher', compact('teacher'));
    })->name('teacher');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
