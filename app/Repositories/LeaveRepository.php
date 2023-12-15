<?php

namespace App\Repositories;
use App\Interfaces\LeaveInterface;
use App\Models\Leave;


class LeaveRepository implements LeaveInterface
{
    public function save($data,$id)
    {
        $data= Leave::create([
        'user_id' => $id,
        'description'=>$data['description'],
        'requested_date'=>$data['requested_date'],
        'from_date'=>$data['from_date'],
        'to_date'=>$data['to_date'],
        'status'=>$data['status'],
        'reason'=>$data['reason'],

       ]);
        return true;
    }

    public function update($data,$id)
    {
        $leave = Leave::where('id',$id)->first();
        $leave->update($data);
        return true;
    }
}
