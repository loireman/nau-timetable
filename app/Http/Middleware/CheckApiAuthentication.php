<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class CheckApiAuthentication
{
    public function handle(Request $request, Closure $next)
    {
        // Check if the request has a valid authentication token
        $token = $request->bearerToken();

        if ($token) {
            // Retrieve the personal access token
            $personalAccessToken = PersonalAccessToken::findToken($token);

            if ($personalAccessToken) {
                // Retrieve user based on the token
                $user = $personalAccessToken->tokenable;

                if ($user && $user instanceof \App\Models\User) {
                    // Set the authenticated user in the request
                    $request->merge(['user' => $user]);

                    // User is authenticated
                    return $next($request);
                }
            }
        }

        return response(['status' => 'not_authenticated'], 401);
    }
}
