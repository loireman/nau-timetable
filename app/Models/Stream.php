<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stream extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'course',
        'department_id',
        'updated_at',
        'created_at'
    ];

    public function department()
    {
        return $this->belongsTo(Departments::class, 'department_id', 'id');
    }

    public function groups()
    {
        return $this->hasMany(Groups::class, 'stream_id', 'id');
    }
}
