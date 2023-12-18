<?php

namespace App\Repositories;
use App\Interfaces\LeaveInterface;
use App\Models\Leave;


class LeaveRepository implements LeaveInterface
{
    public function save($data,$id)
    {
        $leaves= Leave::create([
        'user_id' => $id,
        'description'=>$data['description'],
        'requested_date'=>$data['requested_date'],
        'from_date'=>$data['from_date'],
        'to_date'=>$data['to_date'],
        'status'=>$data['status'],

       ]);
       if (array_key_exists('reason', $data)) {
       Leave::where('user_id',$id)->update(['reason'=>$data['reason']]);
       }
       if(array_key_exists('file',$data) && isset($data['file']))
       {
        $file = $data['file'];
        $fileName = uniqid().'_'.time().'_'.$file->getClientOriginalName();
        $filePath = $file->storeAs('LeaveFile', $fileName . $id . '.' . $file->getClientOriginalExtension(), 'public');
        Leave::where('user_id',$id)->update(['file'=>$filePath]);
       }

        return true;
    }

    public function update($data,$id)
    {
        $leave = Leave::where('id',$id)->first();
        $leave->update($data);
        if(array_key_exists('file',$data) && isset($data['file']))
        {
            $file = $data['file'];
            $fileName = uniqid().'_'.time().'_'.$file->getClientOriginalName();
            $filePath = $file->storeAs('LeaveFile', $fileName . $id . '.' . $file->getClientOriginalExtension(), 'public');
            Leave::where('user_id',$id)->update(['file'=>$filePath]);
        }
        return true;
    }
}
