<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;

class StoreTimetableRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:63',
            'week' => 'required|integer',
            'lesson' => 'required|integer|max:6',
            'teacher' => 'nullable|string|max:255',
            'type' => 'required|integer',
            'day' => 'required|integer',
            'pgroup' => 'nullable|integer',
            'auditory' => 'nullable|string',
            'auditory_link' => 'nullable|string',
            'group_ids' => [
                'required',
                'array',
                function ($attribute, $value, $fail) {
                    $type = $this->input('type'); // Get the type from the request

                    // Validate lecture type (0): At least one group must be selected
                    if ($type == 0 && empty($value)) {
                        $fail('At least one group must be selected for lectures.');
                    }

                    // Validate non-lectures (1 or 2): Only one group can be assigned
                    if ($type != 0 && count($value) > 1) {
                        $fail('Only one group can be selected for non-lecture classes.');
                    }

                    // Validate time conflicts
                    foreach ($value as $groupId) {
                        $exists = DB::table('group_timetable')
                            ->join('timetables', 'group_timetable.timetable_id', '=', 'timetables.id')
                            ->where('group_timetable.group_id', $groupId)
                            ->where('timetables.week', $this->input('week'))
                            ->where('timetables.day', $this->input('day'))
                            ->where('timetables.lesson', $this->input('lesson'))
                            ->where('timetables.pgroup', $this->input('pgroup'))
                            ->exists();

                        if ($exists) {
                            $fail("Group with ID {$groupId} already has a class at this time slot.");
                        }
                    }
                }
            ],
            'group_ids.*' => [
                'required',
                'integer',
                'exists:groups,id',
            ],
        ];
    }

    public function messages()
    {
        return [
            'group_ids.required' => 'At least one group must be selected.',
            'group_ids.*.required' => 'Each group ID must be provided.',
            'group_ids.*.integer' => 'Each group ID must be an integer.',
            'group_ids.*.exists' => 'Selected group does not exist.',
        ];
    }
}
