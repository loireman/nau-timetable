<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreConfigRequest;
use App\Http\Requests\Admin\UpdateConfigRequest;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
class ConfigController extends Controller
{
    function __construct()
    {
         $this->middleware('can:config list', ['only' => ['index','show']]);
         $this->middleware('can:config create', ['only' => ['create','store']]);
         $this->middleware('can:config edit', ['only' => ['edit','update']]);
         $this->middleware('can:config delete', ['only' => ['destroy']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $configs = (new Setting)->newQuery();
        if (request()->has('search')) {
            $configs->where('name', 'Like', '%'.request()->input('search').'%');
        }    if (request()->query('sort')) {
            $attribute = request()->query('sort');
            $sort_order = 'ASC';
            if (strncmp($attribute, '-', 1) === 0) {
                $sort_order = 'DESC';
                $attribute = substr($attribute, 1);
            }
            $configs->orderBy($attribute, $sort_order);
        } else {
            $configs->latest();
        }    $configs = $configs->paginate(10)->onEachSide(2)->appends(request()->query());
        return Inertia::render('Admin/Config/Index', [
            'configs' => $configs,
            'filters' => request()->all('search'),
            'can' => [
                'create' => Auth::user()->can('config create'),
                'edit' => Auth::user()->can('config edit'),
                'delete' => Auth::user()->can('config delete'),
            ],
            'message' => session('message'),
            'error' => session('error'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Config/Create');
    }

    public function edit(Setting $config)
    {
        return Inertia::render('Admin/Config/Edit', [
            'config' => $config
        ]);
    }

    public function store(StoreConfigRequest $request)
    {
        Setting::create($request->all());
        return redirect()->route('config.index')
            ->with('message', __('Config created successfully.'));
    }

    public function update(UpdateConfigRequest $request, Setting $config)
    {
        $config->update($request->all());

        return redirect()->route('config.index')
            ->with('message', __('config updated successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Setting  $config
     * @return \Illuminate\Http\Response
     */
    public function destroy(Setting $config)
    {
        try {
            $config->delete();
        } catch (\Throwable $th) {
            return redirect()->route('config.index')
                ->with('error', __($th));
        }

        return redirect()->route('config.index')
            ->with('message', __('config deleted successfully'));
    }
}
