<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Zakazy extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_klienta',
        'id_tov',
        'count_tov'
    ];
}
