<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Repositories\UserRepository;
use App\Interfaces\UserInterface;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;


class UserController extends Controller
{

    private UserInterface $userRepository;

    public function __construct(UserInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    public function list()
    {
        $data = $this->userRepository->getlist();
        return Inertia::render('Admin/User/List',['data'=>$data]);
    }

    public function create()
    {
        return Inertia::render('Admin/User/Create');
    }

    public function save(UserRequest $request){

        $profileImage = $request->file('profile');
        $data = $this->userRepository->save($request ,$profileImage);
        $id = $data->id;
        if($data->user_role === 'admin'){
            return Redirect::back();
        }
        else{
            return redirect::route('admin.user.salary.create',['user'=>$data]);
        }
    }

    public function edit(Request $request , $id){
         $task = $this->userRepository->edit($id);
        return Inertia::render('Admin/User/Edit', ['user' => $task]);
    }

    public function update(Request $request ,$id)
    {
        $this->userRepository->update($id,$request->all());
        return Redirect::route('admin.user.list');
    }

    public function detail($id)
    {
        $items = $this->userRepository->detail($id);
        $items = $this->userRepository->detail($id);
        $data = $items[0];
        $salary = $items[1];
        $leave = $items[2];
        return Inertia::render('Admin/User/Detail',['data'=>$data ,'salary'=>$salary ,'leave'=>$leave]);
    }


    public function delete($id)
    {
        $this->userRepository->delete($id);
        return back();
    }

}
