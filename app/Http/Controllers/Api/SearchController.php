<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Departments;
use App\Models\Groups;
use App\Models\Stream;
use App\Models\Timetable;

class SearchController extends Controller
{
    public function getGroupByName($name = null)
    {
        $groups = Groups::whereNull('stream_id')->where('name', 'like', '%' . $name . '%')->take(10)->pluck('name', 'id');

        return response()->json($groups);
    }
}
