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
        'substream_id',
        'updated_at',
        'created_at'
    ];

    public function stream()
    {
        return $this->belongsTo(Stream::class, 'stream_id', 'id');
    }
    public function substream()
    {
        return $this->belongsTo(Groups::class, 'substream_id', 'id');
    }
    public function timetables()
    {
        return $this->hasMany(Timetable::class, 'group_id', 'id');
    }
}
