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
        'auditory_link',
        'pgroup',
        'created_at',
        'updated_at'
    ];

    public function groups()
    {
        return $this->belongsToMany(Groups::class, 'group_timetable', 'timetable_id', 'group_id');
    }
}
