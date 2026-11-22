<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'service',
        'weight',
        'delivery',
        'phone',
        'status',
        'price',
        'notes',
    ];

    protected $casts = [
        'weight' => 'float',
        'price' => 'float',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
