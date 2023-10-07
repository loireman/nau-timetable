<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Departments;
use App\Models\Groups;
use App\Models\Stream;
use App\Models\Timetable;

use function PHPUnit\Framework\isEmpty;
use function PHPUnit\Framework\isNull;

class DepartmentController extends Controller
{
    public function getDepartments()
    {
        $departments = Departments::pluck('short', 'id');
        return ([
            'status' => 200,
            'data' => $departments,
        ]);
    }
    public function getStreams($department)
    {
        if (isset($department)) {
            $streams = Stream::where('department_id', $department)->with('groups')->get(['name', 'course', 'id']);

            $data = [];
            $streams->each(function ($item) use (&$data) {
                foreach ($item->groups as $group) {
                    $data[$group->id] = $group->name;
                }
            });

            return ([
                'status' => 200,
                'data' => $data,
            ]);
        }
        return ([
            'status' => 404,
            'data' => 'Department not found'
        ]);
    }
    public function getGroups($stream, $group = null)
    {
        if (isset($stream)) {
            $timetables = Timetable::where('group_id', $stream)->get([
                'name',
                'teacher',
                'type',
                'week',
                'day',
                'lesson',
                'auditory',
                'pgroup',
            ]);

            if (isset($group)) {
                if ($stream == $group) {
                    return ([
                        'status' => 422,
                        'data' => 'The stream value is same as group'
                    ]);
                }

                $timetables_group = Timetable::where('group_id', $group)->get([
                    'name',
                    'teacher',
                    'type',
                    'week',
                    'day',
                    'lesson',
                    'auditory',
                    'pgroup',
                ]);
                $timetables = array_merge($timetables->toArray(), $timetables_group->toArray());
            } else {
                $groups = Groups::where('substream_id', $stream)->pluck('name', 'id');
            }

            return ([
                'status' => 200,
                'data' => [
                    'groups' => $groups ?? null,
                    'timetables' => $timetables
                ],
            ]);
        }
        return ([
            'status' => 404,
            'data' => 'Stream not found'
        ]);
    }
    public function getTeachers()
    {
        $teachers = Timetable::whereNotNull('teacher')->groupBy('teacher')->pluck('teacher');

        return ([
            'status' => 200,
            'data' => $teachers,
        ]);
    }
    public function getTeachersSchedule($teacher)
    {
        $data = Timetable::where('teacher', $teacher)->get([
            'name',
            'teacher',
            'type',
            'week',
            'day',
            'lesson',
            'auditory',
            'pgroup',
        ]);

        if (!$data->isEmpty()) {
            return ([
                'status' => 200,
                'data' => $data,
            ]);
        }
        return ([
            'status' => 404,
            'data' => 'Data not found by this name',
        ]);
    }
}
