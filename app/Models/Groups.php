<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Groups extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'stream_id',
        'single_week',
        'single_group',
        'updated_at',
        'created_at'
    ];

    public function stream()
    {
        return $this->belongsTo(Stream::class, 'stream_id', 'id');
    }
    public function timetables()
    {
        return $this->belongsToMany(Timetable::class, 'group_timetable', 'group_id', 'timetable_id');
    }
}
