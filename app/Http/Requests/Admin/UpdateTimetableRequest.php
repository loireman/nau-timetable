<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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

        return [
            'name' => 'required|string|max:63',
            'week' => 'required|integer',
            'lesson' => [
                'required',
                'integer',
                'max:6',
            ],
            'teacher' => 'nullable|string|max:255',
            'type' => 'required|integer',
            'day' => 'required|integer',
            'pgroup' => 'nullable|integer',
            'auditory' => 'nullable|string',
            'group_id' => 'required|integer',
        ];
    }
}
