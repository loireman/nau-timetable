<?php

namespace App\Providers;

use App\Models\Setting;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema; // Import Schema facade
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }
        // Check if the "settings" table exists
        if (Schema::hasTable('settings')) {
            config([
                'config' => Setting::all([
                    'name', 'value'
                ])
                    ->keyBy('name') // key every setting by its name
                    ->transform(function ($setting) {
                        return $setting->value; // return only the value
                    })
                    ->toArray() // make it an array
            ]);
        }
    }
}
