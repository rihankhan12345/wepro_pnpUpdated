<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Developer extends Model
{
    use HasFactory;
    protected $table = 'developers';
    protected $fillable =[
        'project_id',
        'developer_id',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function assignable(){
        return $this->morphTo();
    }

   
}
