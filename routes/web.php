<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
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

Route::get('/test', function () {
    $globalAlert = config('global.global_alert');

    return Inertia::render('Welcome', ['globalAlert' => $globalAlert]);
})->name('test1');

Route::get('/timetable/{department?}/{stream?}/{group?}/{pgroup?}', function ($department = 0, $stream = 0, $group = 0, $pgroup = 0) {
    return Inertia::render('Timetable', compact('department', 'stream', 'group', 'pgroup'));
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
