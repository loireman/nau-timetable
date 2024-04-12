<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Request;

class StoreTimetableRequest extends FormRequest
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
                Rule::unique('timetables', 'lesson')
                    ->ignore($currentId, 'id')
                    ->where(function ($query) {
                        $query->where('week', request('week'))
                              ->where('day', request('day'))
                              ->where('pgroup', request('pgroup'))
                              ->where('group_id', request('group_id'));
                    }),
            ],
            'teacher' => 'nullable|string|max:255',
            'type' => 'required|integer',
            'day' => 'required|integer',
            'pgroup' => 'nullable|integer',
            'auditory' => 'nullable|string',
            'auditory_link' => 'nullable|string',
            'group_id' => 'nullable|integer',
            'stream_id' => 'nullable|integer',
        ];
    }
}
