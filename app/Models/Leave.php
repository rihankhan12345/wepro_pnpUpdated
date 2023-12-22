<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Leave extends Model
{
    use HasFactory;
    protected $table = 'leaves';
    protected $fillable = [
        'requested_date',
        'description',
        'subject',
        'to_date',
        'status',
        'reason',
        'days',
        'user_id',
        'file',
    ];
}
