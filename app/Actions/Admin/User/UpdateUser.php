<?php

namespace App\Actions\Admin\User;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UpdateUser
{
    public function handle(Request $request, User $user): User
    {
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'group_id' => $request->group_id
        ]);

        if ($request->password) {
            $user->update([
                'password' => Hash::make($request->password),
            ]);
        }

        $roles = $request->roles ?? [];
        $user->syncRoles($roles);

        return $user;
    }
}
