<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreGroupRequest;
use App\Http\Requests\Admin\UpdateGroupRequest;
use App\Models\Groups;
use App\Models\Stream;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class GroupController extends Controller
{
    function __construct()
    {
        $this->middleware('can:group list', ['only' => ['index', 'show']]);
        $this->middleware('can:group create', ['only' => ['create', 'store']]);
        $this->middleware('can:group edit', ['only' => ['edit', 'update']]);
        $this->middleware('can:group delete', ['only' => ['destroy']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $groups = (new Groups)->newQuery();

        if (request()->query('sort')) {
            $attribute = request()->query('sort');
            $sort_order = 'ASC';
            if (strncmp($attribute, '-', 1) === 0) {
                $sort_order = 'DESC';
                $attribute = substr($attribute, 1);
            }
            $groups->orderBy($attribute, $sort_order);
        } else {
            $groups->latest();
        }

        $groups = $groups->with(['stream']);

        $groups = $groups->paginate(10)->onEachSide(2)->appends(request()->query());

        return Inertia::render('Admin/Group/Index', [
            'groups' => $groups,
            'filters' => request()->all('search'),
            'can' => [
                'create' => Auth::user()->can('group create'),
                'edit' => Auth::user()->can('group edit'),
                'delete' => Auth::user()->can('group delete'),
            ],
            'message' => session('message'),
            'error' => session('error'),
        ]);
    }

    public function create()
    {
        $streams = Stream::selectRaw('id, CONCAT(name, " (", course, " курс)") as name')->pluck('name', 'id')->all();

        return Inertia::render('Admin/Group/Create', [
            'streams' => $streams,
        ]);
    }

    public function edit(Groups $group)
    {
        $streams = Stream::selectRaw('id, CONCAT(name, " (", course, " курс)") as name')->pluck('name', 'id')->all();

        return Inertia::render('Admin/Group/Edit', [
            'streams' => $streams,
            'group' => $group,
        ]);
    }

    public function store(StoreGroupRequest $request)
    {
        Groups::create($request->all());
        return redirect()->route('group.index')
            ->with('message', __('Groups created successfully.'));
    }

    public function update(UpdateGroupRequest $request, Groups $group)
    {
        $group->update($request->all());

        return redirect()->route('group.index')
            ->with('message', __('Groups updated successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\groups  $Groups
     * @return \Illuminate\Http\Response
     */
    public function destroy(Groups $group)
    {
        try {
            $group->delete();
        } catch (\Throwable $th) {
            return redirect()->route('group.index')
                ->with('error', __($th));
        }

        return redirect()->route('group.index')
            ->with('message', __('Groups deleted successfully'));
    }
}
