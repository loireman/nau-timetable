<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;

class UpdateTimetableRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $currentId = $this->route('timetable');
        $timetable = DB::table('timetables')->find($currentId);

        $rules = [
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
                'array',
                function ($attribute, $value, $fail) use ($currentId, $timetable) {
                    $type = $this->input('type');

                    // If type is 0 (lecture) and no groups provided, we'll check if there are existing groups
                    if ($type == 0 && empty($value)) {
                        $existingGroups = DB::table('group_timetable')
                            ->where('timetable_id', $currentId)
                            ->exists();

                        if (!$existingGroups) {
                            $fail('At least one group must be selected for lectures.');
                        }
                        return; // Skip further validation if we're keeping existing groups
                    }

                    // For non-lectures (type 1 or 2), enforce single group
                    if ($type != 0 && count($value) > 1) {
                        $fail('Only one group can be selected for non-lecture classes.');
                    }

                    // Skip time conflict validation if no new groups are provided
                    if (empty($value)) {
                        return;
                    }

                    // Validate time conflicts for new group assignments
                    if ($type != 0) {

                        foreach ($value as $groupId) {
                            $exists = DB::table('group_timetable')
                                ->join('timetables', 'group_timetable.timetable_id', '=', 'timetables.id')
                                ->where('group_timetable.group_id', $groupId)
                                ->where('timetables.week', $this->input('week'))
                                ->where('timetables.day', $this->input('day'))
                                ->where('timetables.lesson', $this->input('lesson'))
                                ->where('timetables.pgroup', $this->input('pgroup'))
                                ->where('timetables.id', '!=', $currentId)
                                ->exists();

                            if ($exists) {
                                $fail("Group with ID {$groupId} already has a class at this time slot.");
                            }
                        }
                    }
                }
            ],
        ];

        // Only apply group_ids element validation if groups are provided
        if ($this->has('group_ids') && !empty($this->input('group_ids'))) {
            $rules['group_ids.*'] = [
                'required',
                'integer',
                'exists:groups,id',
            ];
        }

        return $rules;
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'group_ids.array' => 'Groups must be provided as an array.',
            'group_ids.*.required' => 'Each group ID must be provided.',
            'group_ids.*.integer' => 'Each group ID must be an integer.',
            'group_ids.*.exists' => 'Selected group does not exist.',
        ];
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation()
    {
        // If type is 0 and no group_ids provided, get existing groups
        if ($this->input('type') == 0 && !$this->has('group_ids')) {
            $currentId = $this->route('timetable');
            $existingGroups = DB::table('group_timetable')
                ->where('timetable_id', $currentId)
                ->pluck('group_id')
                ->toArray();

            if (!empty($existingGroups)) {
                $this->merge([
                    'group_ids' => $existingGroups
                ]);
            }
        }
    }
}
