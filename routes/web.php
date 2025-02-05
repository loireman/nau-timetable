<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Redirect;
use Laravel\Socialite\Facades\Socialite;
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



Route::middleware('web')->get('google/auth/redirect', function () {
    return Socialite::driver('google')->redirect();
})->name('google.redirect');
Route::middleware('web')->get('google/auth/callback', function () {
    $user = Socialite::driver('google')->user();

    return Redirect('/timetable');
    // $user->token
});

Route::get('/api', function () {
    return Inertia::render('Api');
})->name('test1');

Route::get('/test', function () {
    $globalAlert = config('config.global_alert');

    return Inertia::render('Welcome', ['globalAlert' => $globalAlert]);
})->name('test1');

Route::group([
    'prefix'     => 'timetable',
], function () {
    Route::get('/', function () {
        $group = "";
        $startWeek = config('config.start_week');
        if (request()->has('group')) {
            $group = request()->input('group');
        }
        return Inertia::render('Timetable/Group', compact('group', 'startWeek'));
    })->name('dashboard');

    Route::get('teacher', function () {
        $teacher = "";
        $startWeek = config('config.start_week');
        if (request()->has('teacher')) {
            $teacher = request()->input('teacher');
        }
        return Inertia::render('Timetable/Teacher', compact('teacher', 'startWeek'));
    })->name('teacher');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
