<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreDepartmentRequest;
use App\Http\Requests\Admin\UpdateDepartmentRequest;
use App\Models\Departments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
class DepartmentController extends Controller
{
    function __construct()
    {
         $this->middleware('can:department list', ['only' => ['index','show']]);
         $this->middleware('can:department create', ['only' => ['create','store']]);
         $this->middleware('can:department edit', ['only' => ['edit','update']]);
         $this->middleware('can:department delete', ['only' => ['destroy']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $departments = (new Departments())->newQuery();    if (request()->has('search')) {
            $departments->where('name', 'Like', '%'.request()->input('search').'%');
        }    if (request()->query('sort')) {
            $attribute = request()->query('sort');
            $sort_order = 'ASC';
            if (strncmp($attribute, '-', 1) === 0) {
                $sort_order = 'DESC';
                $attribute = substr($attribute, 1);
            }
            $departments->orderBy($attribute, $sort_order);
        } else {
            $departments->latest();
        }    $departments = $departments->paginate(10)->onEachSide(2)->appends(request()->query());
        return Inertia::render('Admin/Department/Index', [
            'departments' => $departments,
            'filters' => request()->all('search'),
            'can' => [
                'create' => Auth::user()->can('department create'),
                'edit' => Auth::user()->can('department edit'),
                'delete' => Auth::user()->can('department delete'),
            ],
            'message' => session('message'),
            'error' => session('error'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Department/Create');
    }

    public function edit(Departments $department)
    {
        return Inertia::render('Admin/Department/Edit', [
            'department' => $department
        ]);
    }

    public function store(StoreDepartmentRequest $request)
    {
        Departments::create($request->all());
        return redirect()->route('department.index')
            ->with('message', __('Department created successfully.'));
    }

    public function update(UpdateDepartmentRequest $request, Departments $department)
    {
        $department->update($request->all());

        return redirect()->route('department.index')
            ->with('message', __('Department updated successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Departments  $department
     * @return \Illuminate\Http\Response
     */
    public function destroy(Departments $department)
    {
        try {
            $department->delete();
        } catch (\Throwable $th) {
            return redirect()->route('department.index')
                ->with('error', __($th));
        }
        return redirect()->route('department.index')
            ->with('message', __('department deleted successfully'));
    }
}
