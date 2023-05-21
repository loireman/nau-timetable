<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTovaryRequest;
use App\Http\Requests\Admin\UpdateTovaryRequest;
use App\Models\Tovary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TovaryController extends Controller
{
    /**
     * create a new instance of the class
     *
     * @return void
     */
    function __construct()
    {
        $this->middleware('can:tovary list', ['only' => ['index','show']]);
        $this->middleware('can:tovary create', ['only' => ['create','store']]);
        $this->middleware('can:tovary edit', ['only' => ['edit','update']]);
        $this->middleware('can:tovary delete', ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tovaries = (new Tovary)->newQuery();    if (request()->has('search')) {
            $tovaries->where('name', 'Like', '%'.request()->input('search').'%');
        }    if (request()->query('sort')) {
            $attribute = request()->query('sort');
            $sort_order = 'ASC';
            if (strncmp($attribute, '-', 1) === 0) {
                $sort_order = 'DESC';
                $attribute = substr($attribute, 1);
            }
            $tovaries->orderBy($attribute, $sort_order);
        } else {
            $tovaries->latest();
        }    $tovaries = $tovaries->paginate(10)->onEachSide(2)->appends(request()->query());
        return Inertia::render('Admin/Tovary/Index', [
            'tovaries' => $tovaries,
            'filters' => request()->all('search'),
            'can' => [
                'create' => Auth::user()->can('tovary create'),
                'edit' => Auth::user()->can('tovary edit'),
                'delete' => Auth::user()->can('tovary delete'),
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Tovary/Create');
    }

    public function edit(Tovary $tovaries)
    {
        return Inertia::render('Admin/Tovary/Edit', [
            'tovaries' => $tovaries
        ]);
    }

    public function show(Tovary $tovaries)
    {
        return Inertia::render('Admin/Tovary/Show', [
            'tovaries' => $tovaries,
        ]);
    }

    public function store(StoreTovaryRequest $request)
    {
        Tovary::create($request->all());
        return redirect()->route('tovary.index')
            ->with('message', __('Tovar created successfully.'));
    }

    public function update(UpdateTovaryRequest $request, Tovary $tovaries)
    {
        $tovaries->update($request->all());
        return redirect()->route('tovary.index')
            ->with('message', __('Tovar updated successfully.'));
    }

    public function destroy($tovaries)
    {
        Tovary::where('id', $tovaries)->delete();

        return redirect()->route('tovary.index')
            ->with('message', __('Tovar deleted successfully'));
    }
}
