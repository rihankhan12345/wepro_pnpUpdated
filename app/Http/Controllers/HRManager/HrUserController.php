<?php

namespace App\Http\Controllers\HRManager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Repositories\UserRepository;
use App\Interfaces\UserInterface;

class HrUserController extends Controller
{
    private UserInterface $userRepository;

    public function __construct(UserInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    public function list()
    {
        $data = $this->userRepository->getlist();
        return Inertia::render('HRManager/User/List',compact('data'));
    }

    public function save(UserRequest $request){
        $data = $this->userRepository->save($request );
        $id = $data->id;
        return Redirect::route('hrManager.user.salary.create' ,['user'=>$id]);
    }


    public function update(Request $request ,$id)
    {
       $data= $this->userRepository->update($id,$request->all());
        return Redirect::route('hrManager.user.list');
    }

    public function detail($id)
    {
        $items = $this->userRepository->detail($id);
        $data = $items[0];
        $salary = $items[1];
        $leave = $items[2];
        return Inertia::render('HRManager/User/Detail',['data'=>$data ,'salary'=>$salary ,'leave'=>$leave]);
    }


    public function delete($id)
    {
        $this->userRepository->delete($id);
        return back();
    }
}
