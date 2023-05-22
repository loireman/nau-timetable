<?php

namespace App\Http\Controllers;

use App\Models\Tovary;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TovarController extends Controller
{
    public function index($tovar)
    {
        $tovar = Tovary::where('slug', $tovar)->first();
        return Inertia::render('Tovary/Tovar', [
            'tovar' => $tovar,
        ]);
    }
}
