<?php

namespace App\Repositories;
use App\Interfaces\UserInterface;
use App\Models\User;
use App\Models\Salary;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;
use App\Models\Leave;


class UserRepository implements UserInterface
{

    public function getlist(){
         $data = User::paginate(10);
         return $data;
    }

    public function save($data){
        $user=User::create([
                    'name' => $data->name,
                    'email' => $data->email,
                    'user_role'=>str_replace('_', ' ', $data->user_role),
                    'password' => Hash::make($data->password),
                    'contact_no' => $data->contact_no,
                ]);

        if($data->hasFile('profile')){
            $profileImage = $data->profile;
            $fileName = uniqid().'_'.time().'_'.$profileImage->getClientOriginalName();
            $profileImagePath = $profileImage->storeAs('profile', $fileName . $user->id . '.' . $profileImage->getClientOriginalExtension(), 'public');
            User::where('id',$user->id)->update(['profile' =>$profileImagePath]);
        }
        return $user;
    }

    public function edit($id){
        $task = User::findOrfail($id);
        if (empty($task)) {
            return back();
        }
        return $task;
    }

    public function update($id, $data)
    {
        $validator = Validator::make($data, [
            'email' => 'required|email|unique:users,email,' . $id,
            'name' => 'required|string|max:255',
            'user_role' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        try {
            $user = User::findOrFail($id);
            $user->update($data);
            return true;
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function detail($id)
    {
        $salary = Salary::where('user_id' ,$id)->get();
        $data = User::where('id',$id)->first();
        $leave = Leave::where('user_id',$id)->get();
        return [$data ,$salary ,$leave];

    }

    public function delete($id)
    {
        return User::findOrFail($id)->delete();
    }

}
