<?php

namespace App\Http\Controllers;

use App\Models\Tovary;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TovaryController extends Controller
{
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
        }    $tovaries = $tovaries->paginate(20)->onEachSide(2)->appends(request()->query());
        return Inertia::render('Tovary/Index', [
            'tovaries' => $tovaries,
            'filters' => request()->all('search'),
        ]);
    }
}
