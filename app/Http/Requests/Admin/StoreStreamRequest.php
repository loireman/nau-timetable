<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Request;

class StoreStreamRequest extends FormRequest
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
        $currentId = $this->route('stream');

        return [
            'name' => 'required|string|max:63',
            'course' => [
                'required',
                'integer',
                'max:6',
                Rule::unique('streams', 'course')
                    ->ignore($currentId, 'id')
                    ->where(function ($query) {
                        $query->where('name', request('name'));
                    }),
            ],
            'department_id' => 'required|integer',
        ];
    }
}
