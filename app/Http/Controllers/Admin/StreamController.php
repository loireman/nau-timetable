<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreStreamRequest;
use App\Http\Requests\Admin\UpdateStreamRequest;
use App\Models\Departments;
use App\Models\Setting;
use App\Models\Stream;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StreamController extends Controller
{
    function __construct()
    {
        $this->middleware('can:stream list', ['only' => ['index', 'show']]);
        $this->middleware('can:stream create', ['only' => ['create', 'store']]);
        $this->middleware('can:stream edit', ['only' => ['edit', 'update']]);
        $this->middleware('can:stream delete', ['only' => ['destroy']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $streams = (new Stream)->newQuery();
        if (request()->has('search')) {
            $streams->where('name', 'Like', '%' . request()->input('search') . '%');
        }
        if (request()->query('sort')) {
            $attribute = request()->query('sort');
            $sort_order = 'ASC';
            if (strncmp($attribute, '-', 1) === 0) {
                $sort_order = 'DESC';
                $attribute = substr($attribute, 1);
            }
            $streams->orderBy($attribute, $sort_order);
        } else {
            $streams->latest();
        }

        $streams = $streams->with('department');

        $streams = $streams->paginate(10)->onEachSide(2)->appends(request()->query());

        return Inertia::render('Admin/Stream/Index', [
            'streams' => $streams,
            'filters' => request()->all('search'),
            'can' => [
                'create' => Auth::user()->can('stream create'),
                'edit' => Auth::user()->can('stream edit'),
                'delete' => Auth::user()->can('stream delete'),
            ],
            'message' => session('message'),
            'error' => session('error'),
        ]);
    }

    public function create()
    {
        $departments = Departments::pluck('name', 'id')->all();

        return Inertia::render('Admin/Stream/Create', [
            'departments' => $departments,
        ]);
    }

    public function edit(Stream $stream)
    {
        $departments = Departments::pluck('name', 'id')->all();

        return Inertia::render('Admin/Stream/Edit', [
            'departments' => $departments,
            'stream' => $stream
        ]);
    }

    public function store(StoreStreamRequest $request)
    {
        Stream::create($request->all());
        return redirect()->route('stream.index')
            ->with('message', __('Stream created successfully.'));
    }

    public function update(UpdateStreamRequest $request, Stream $stream)
    {
        $stream->update($request->all());

        return redirect()->route('stream.index')
            ->with('message', __('Stream updated successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Stream  $Stream
     * @return \Illuminate\Http\Response
     */
    public function destroy(Stream $stream)
    {
        try {
            $stream->delete();
        } catch (\Throwable $th) {
            return redirect()->route('stream.index')
                ->with('error', __($th));
        }

        return redirect()->route('stream.index')
            ->with('message', __('Stream deleted successfully'));
    }
}
