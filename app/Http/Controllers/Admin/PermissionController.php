<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePermissionRequest;
use App\Http\Requests\Admin\UpdatePermissionRequest;
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
class PermissionController extends Controller
{
    function __construct()
    {
         $this->middleware('can:permission list', ['only' => ['index','show']]);
         $this->middleware('can:permission create', ['only' => ['create','store']]);
         $this->middleware('can:permission edit', ['only' => ['edit','update']]);
         $this->middleware('can:permission delete', ['only' => ['destroy']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $permissions = (new Permission)->newQuery();    if (request()->has('search')) {
            $permissions->where('name', 'Like', '%'.request()->input('search').'%');
        }    if (request()->query('sort')) {
            $attribute = request()->query('sort');
            $sort_order = 'ASC';
            if (strncmp($attribute, '-', 1) === 0) {
                $sort_order = 'DESC';
                $attribute = substr($attribute, 1);
            }
            $permissions->orderBy($attribute, $sort_order);
        } else {
            $permissions->latest();
        }    $permissions = $permissions->paginate(10)->onEachSide(2)->appends(request()->query());
        return Inertia::render('Admin/Permission/Index', [
            'permissions' => $permissions,
            'filters' => request()->all('search'),
            'can' => [
                'create' => Auth::user()->can('permission create'),
                'edit' => Auth::user()->can('permission edit'),
                'delete' => Auth::user()->can('permission delete'),
            ],
            'message' => session('message'),
            'error' => session('error'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Permission/Create');
    }

    public function edit(Permission $permission)
    {
        return Inertia::render('Admin/Permission/Edit', [
            'permission' => $permission
        ]);
    }

    public function store(StorePermissionRequest $request)
    {
        Permission::create($request->all());
        return redirect()->route('permission.index')
            ->with('message', __('Permission created successfully.'));
    }

    public function update(UpdatePermissionRequest $request, Permission $permission)
    {
        $permission->update($request->all());

        return redirect()->route('permission.index')
            ->with('message', __('Permission updated successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function destroy(Permission $permission)
    {
        try {
            $permission->delete();
        } catch (\Throwable $th) {
            return redirect()->route('permission.index')
                ->with('error', __($th));
        }
        return redirect()->route('permission.index')
            ->with('message', __('Permission deleted successfully'));
    }
}
