<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TguserGroupRelation extends Model
{
    use HasFactory;

    protected $fillable = [
        'telegram_id',
        'group_id',
        'pgroup',
        'updated_at',
        'created_at'
    ];
}
