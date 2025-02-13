<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTimetableRequest;
use App\Http\Requests\Admin\UpdateTimetableRequest;
use App\Models\Groups;
use App\Models\Timetable;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TimetableController extends Controller
{
    function __construct()
    {
        $this->middleware('can:timetable list', ['only' => ['index', 'show']]);
        $this->middleware('can:timetable create', ['only' => ['create', 'store']]);
        $this->middleware('can:timetable edit', ['only' => ['edit', 'update']]);
        $this->middleware('can:timetable delete', ['only' => ['destroy']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $timetables = (new Timetable)->newQuery();
        if (request()->has('search')) {
            $timetables->where('name', 'Like', '%' . request()->input('search') . '%');
        }
        if (request()->query('sort')) {
            $attribute = request()->query('sort');
            $sort_order = 'ASC';
            if (strncmp($attribute, '-', 1) === 0) {
                $sort_order = 'DESC';
                $attribute = substr($attribute, 1);
            }
            $timetables->orderBy($attribute, $sort_order);
        } else {
            $timetables->latest();
        }

        $timetables = $timetables->with('groups');

        $timetables = $timetables->paginate(10)->onEachSide(2)->appends(request()->query());

        return Inertia::render('Admin/Timetable/Index', [
            'timetables' => $timetables,
            'filters' => request()->all('search'),
            'can' => [
                'create' => Auth::user()->can('timetable create'),
                'edit' => Auth::user()->can('timetable edit'),
                'delete' => Auth::user()->can('timetable delete'),
            ],
            'message' => session('message'),
            'error' => session('error'),
        ]);
    }

    public function create()
    {
        if (Auth::user()->can('timetable allgroups')) {
            $groups = Groups::pluck('name', 'id')->all();
        } else {
            $groups = Groups::where('id', Auth::user()->group_id)->pluck('name', 'id')->all();
        }

        return Inertia::render('Admin/Timetable/Create', [
            'groups' => $groups,
        ]);
    }

    public function edit(Timetable $timetable)
    {
        if (Auth::user()->can('timetable allgroups')) {
            $groups = Groups::pluck('name', 'id')->all();
        } else {
            $groups = Groups::where('id', Auth::user()->group_id)->pluck('name', 'id')->all();
        }

        $selected = $timetable->groups->pluck('id');

        return Inertia::render('Admin/Timetable/Edit', [
            'groups' => $groups,
            'selected' => $selected,
            'timetable' => $timetable
        ]);
    }

    public function store(StoreTimetableRequest $request)
    {
        $validated = $request->validated();

        $timetable = Timetable::create([
            'name' => $validated['name'],
            'week' => $validated['week'],
            'day' => $validated['day'],
            'lesson' => $validated['lesson'],
            'teacher' => $validated['teacher'],
            'type' => $validated['type'],
            'pgroup' => $validated['pgroup'],
            'auditory' => $validated['auditory'],
            'auditory_link' => $validated['auditory_link'],
        ]);

        // Attach groups
        foreach ($validated['group_ids'] as $groupId) {
            $timetable->groups()->attach($groupId);
        }

        return redirect()->route('timetable.index')->with('success', 'Timetable created successfully');
    }

    public function update(UpdateTimetableRequest $request, Timetable $timetable)
    {
        $validated = $request->validated();

        // Update timetable basic information
        $timetable->update([
            'name' => $validated['name'],
            'week' => $validated['week'],
            'day' => $validated['day'],
            'lesson' => $validated['lesson'],
            'teacher' => $validated['teacher'],
            'type' => $validated['type'],
            'pgroup' => $validated['pgroup'],
            'auditory' => $validated['auditory'],
            'auditory_link' => $validated['auditory_link'],
        ]);

        // Sync groups (detach all existing and attach new ones)
        $timetable->groups()->sync($validated['group_ids']);

        return redirect()->route('timetable.index')
            ->with('success', 'Timetable updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Timetable  $timetable
     * @return \Illuminate\Http\Response
     */
    public function destroy(Timetable $timetable)
    {
        try {
            $timetable->delete();
        } catch (\Throwable $th) {
            return redirect()->route('timetable.index')
                ->with('error', __($th));
        }

        return redirect()->route('timetable.index')
            ->with('message', __('Timetable deleted successfully'));
    }
}
