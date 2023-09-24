<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Timetable extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher',
        'name',
        'type',
        'week',
        'day',
        'lesson',
        'auditory',
        'pgroup',
        'group_id',
        'created_at',
        'updated_at'
    ];

    public function group()
    {
        return $this->belongsTo(Groups::class, 'group_id', 'id');
    }
}
