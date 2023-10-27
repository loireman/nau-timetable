<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateGroupRequest extends FormRequest
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
        return [
            'name' => 'required|string|max:63|unique:groups,name,' . $this->group->id,
            'stream_id' => 'integer|nullable',
            'substream_id' => 'integer|nullable',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $data = $validator->getData();

            $streamId = $data['stream_id'];
            $substreamId = $data['substream_id'];

            if ($streamId === null && $substreamId === null) {
                $validator->errors()->add('stream_id', 'Either stream_id or substream_id must have a value.');
            } elseif ($streamId !== null && $substreamId !== null) {
                $validator->errors()->add('stream_id', 'Both stream_id and substream_id cannot have values at the same time.');
            }
        });
    }
}
