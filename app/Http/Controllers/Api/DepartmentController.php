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
                'data' => [
                    'timetables' => $data,
                ],
            ]);
        }
        return ([
            'status' => 404,
            'data' => 'Data not found by this name',
        ]);
    }
}
