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
        $groups = Groups::where('name', 'like', '%' . $name . '%')->pluck('name', 'id');

        return response()->json($groups);
    }
    public function getTeacherByName($name = null)
    {
        $teachers = Timetable::whereNotNull('teacher')->where('teacher', 'like', '%' . $name . '%')->groupBy('teacher')->orderBy('teacher')->pluck('teacher');

        return response()->json($teachers);
    }
}
