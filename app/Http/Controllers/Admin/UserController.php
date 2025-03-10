<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Admin\User\CreateUser;
use App\Actions\Admin\User\UpdateUser;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUserRequest;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Models\Groups;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:user list', ['only' => ['index', 'show']]);
        $this->middleware('can:user create', ['only' => ['create', 'store']]);
        $this->middleware('can:user edit', ['only' => ['edit', 'update']]);
        $this->middleware('can:user delete', ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = (new User)->newQuery();

        if (request()->has('search')) {
            $users->where('name', 'Like', '%'.request()->input('search').'%');
        }

        if (request()->query('sort')) {
            $attribute = request()->query('sort');
            $sort_order = 'ASC';
            if (strncmp($attribute, '-', 1) === 0) {
                $sort_order = 'DESC';
                $attribute = substr($attribute, 1);
            }
            $users->orderBy($attribute, $sort_order);
        } else {
            $users->latest();
        }

        $users->with('roles');

        $users = $users->paginate(5)->onEachSide(2)->appends(request()->query());

        return Inertia::render('Admin/User/Index', [
            'users' => $users,
            'filters' => request()->all('search'),
            'can' => [
                'create' => Auth::user()->can('user create'),
                'edit' => Auth::user()->can('user edit'),
                'delete' => Auth::user()->can('user delete'),
            ],
            'message' => session('message'),
            'error' => session('error'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $roles = Role::all()->pluck("name","id");
        $groups = Groups::whereNotNull('substream_id')->pluck('name', 'id')->all();

        return Inertia::render('Admin/User/Create', [
            'roles' => $roles,
            'groups' => $groups,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Admin\StoreUserRequest  $request
     * @param  \App\Actions\Admin\User\CreateUser  $createUser
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request, CreateUser $createUser)
    {
        $createUser->handle($request);

        return redirect()->route('user.index')
                        ->with('message', __('User created successfully.'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        $roles = Role::all()->pluck("name","id");
        $groups = Groups::whereNotNull('substream_id')->pluck('name', 'id')->all();
        $userHasRoles = array_column(json_decode($user->roles, true), 'id');

        return Inertia::render('Admin/User/Edit', [
            'user' => $user,
            'roles' => $roles,
            'groups' => $groups,
            'userHasRoles' => $userHasRoles,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Admin\UpdateUserRequest  $request
     * @param  \App\Models\User  $user
     * @param  \App\Actions\Admin\User\UpdateUser  $updateUser
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user, UpdateUser $updateUser)
    {
        $updateUser->handle($request, $user);

        return redirect()->route('user.index')
                        ->with('message', __('User updated successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        try {
            $user->delete();
        } catch (\Throwable $th) {
            return redirect()->route('permission.index')
                ->with('error', __($th));
        }

        return redirect()->route('user.index')
                        ->with('message', __('User deleted successfully'));
    }

    /**
     * Show the user a form to change their personal information & password.
     */
    public function accountInfo()
    {
        $user = \Auth::user();

        return Inertia::render('Admin/User/AccountInfo', [
            'user' => $user,
        ]);
    }

    /**
     * Save the modified personal information for a user.
     */
    public function accountInfoStore(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,'.\Auth::user()->id],
        ]);

        $user = \Auth::user()->update($request->except(['_token']));

        if ($user) {
            $message = 'Account updated successfully.';
        } else {
            $message = 'Error while saving. Please try again.';
        }

        return redirect()->route('admin.account.info')->with('message', __($message));
    }

    /**
     * Save the new password for a user.
     */
    public function changePasswordStore(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'old_password' => ['required'],
            'new_password' => ['required', Rules\Password::defaults()],
            'confirm_password' => ['required', 'same:new_password', Rules\Password::defaults()],
        ]);

        $validator->after(function ($validator) use ($request) {
            if ($validator->failed()) {
                return;
            }
            if (! Hash::check($request->input('old_password'), \Auth::user()->password)) {
                $validator->errors()->add(
                    'old_password', __('Old password is incorrect.')
                );
            }
        });

        $validator->validate();

        $user = \Auth::user()->update([
            'password' => Hash::make($request->input('new_password')),
        ]);

        if ($user) {
            $message = 'Password updated successfully.';
        } else {
            $message = 'Error while saving. Please try again.';
        }

        return redirect()->route('admin.account.info')->with('message', __($message));
    }
}
