<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;
use Laravel\Sanctum\Sanctum;

class ApiAuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
        ]);
        if ($validator->fails()) {
            return response(['message' => $validator->errors()->all()], 422);
        }
        $user = User::where('email', $request->email)->first();

        if ($user) {
            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken('loiriTimetableToken', ['server_token'])->plainTextToken;

                if ($request->remember) {
                    // Get the token instance
                    $accessToken = $user->tokens->last();

                    // Set the expiration time to 3 hours
                    $expirationTime = now()->addHours(3);

                    // Update the token's expiration time
                    $accessToken->forceFill([
                        'expires_at' => $expirationTime,
                    ])->save();
                }

                $response = ['token' => $token];
                return response($response, 200);
            } else {
                $response = ["message" => "Password mismatch"];
                return response($response, 422);
            }
        } else {
            $response = ["message" => 'User does not exist'];
            return response($response, 422);
        }
    }

    public function checkLogin(Request $request)
    {

        // Check if the request has a valid authentication token
        $token = $request->bearerToken();

        if ($token) {
            // Retrieve the personal access token
            $personalAccessToken = PersonalAccessToken::findToken($token);

            if ($personalAccessToken) {
                // Retrieve user based on the token
                $user = $personalAccessToken->tokenable;

                if ($user && $user instanceof User) {
                    // User is authenticated
                    return response(['status' => 'authenticated'], 200);
                }
            }
        }

        return response(['status' => 'not_authenticated'], 401);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        $user = $request->user();

        if ($user) {
            // Revoke the current access token 
            $user->currentAccessToken()->delete();
        }

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response(['message' => 'Logout successful']);
    }
}
