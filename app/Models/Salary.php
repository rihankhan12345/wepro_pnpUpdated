<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salary extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'basic_salary',
        'house_rent',
        'leave_travel_allowance',
        'medical_and_conveyance',
        'statutory_bonus',
        'tax_deducted_at_source',
        'provided_fund',
        'gross_salary',
        'net_salary',
    ];
}
