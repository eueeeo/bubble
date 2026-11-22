<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;

    protected $fillable = [
        'action',
        'entity_type',
        'entity_id',
        'user_name',
        'before_state',
        'after_state',
        'details',
    ];

    protected $casts = [
        'before_state' => 'array',
        'after_state' => 'array',
    ];
}

