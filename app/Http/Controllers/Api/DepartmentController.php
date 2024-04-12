<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Groups;
use App\Models\Timetable;

class DepartmentController extends Controller
{
    public function getGroup($group = null)
    {
        if ($group) {

            $group = Groups::where('name', $group)
                ->with('substream.timetables')
                ->with('timetables')
                ->first();

            $timetables_group = $group->timetables;
            $timetables_stream = $group->substream->timetables;

            $mergedTimetables = $timetables_group->merge($timetables_stream);

            $filteredTimetables = $mergedTimetables->map(function ($timetable) {
                return [
                    'name' => $timetable['name'],
                    'teacher' => $timetable['teacher'],
                    'type' => $timetable['type'],
                    'week' => $timetable['week'],
                    'day' => $timetable['day'],
                    'lesson' => $timetable['lesson'],
                    'auditory' => $timetable['auditory'],
                    'auditory_link' => $timetable['auditory_link'],
                    'pgroup' => $timetable['pgroup'],
                ];
            });

            $timetables = $filteredTimetables->toArray();

            return [
                'status' => 200,
                'data' => [
                    'timetables' => $timetables,
                ],
            ];
        }
        return ([
            'status' => 404,
            'data' => 'Stream not found'
        ]);
    }

    public function getTeachersSchedule($teacher)
    {
        $timetables = Timetable::where('teacher', $teacher)->with('group')->get();

        $timetables = $timetables->map(function ($timetable) {
            return [
                'name' => $timetable['name'],
                'teacher' => $timetable['teacher'],
                'type' => $timetable['type'],
                'week' => $timetable['week'],
                'day' => $timetable['day'],
                'lesson' => $timetable['lesson'],
                'auditory' => $timetable['auditory'],
                'auditory_link' => $timetable['auditory_link'],
                'group' => $timetable['group']['name'],
                'pgroup' => $timetable['pgroup'],
            ];
        });

        if (!$timetables->isEmpty()) {
            return ([
                'status' => 200,
                'data' => [
                    'timetables' => $timetables,
                ],
            ]);
        }
        return ([
            'status' => 404,
            'data' => 'Data not found by this name',
        ]);
    }
}
