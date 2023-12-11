<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\EditProjectRequest;
use App\Http\Requests\EditRequest;
use App\Http\Requests\ProjectRequest;
use App\Models\Developer;
use App\Models\Project;
use App\Models\Task;
use App\Models\Image;
use App\Models\User;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Interfaces\ProjectInterface;
use App\Repositories\ProjectRepository;

class ProjectController extends Controller
{
    private ProjectInterface $projectRepository;

    public function __construct(ProjectInterface $projectRepository){
        $this->projectRepository = $projectRepository;
    }

    // public function multipleFile($id, $file,$data,$type ){
    //     $media = [];
    //     foreach ($file as $key => $file) {
    //         $fileName = uniqid().'_'.time().'_'.$file->getClientOriginalName();
    //         // $fileType = $file->getClientOriginalExtension();
    //         $file->storeAs('/public/task_file', $fileName);
    //         $media[] = [
    //             'text_cases' => $data['text_cases'],
    //             'url' => $fileName,
    //             'imageable_type' => $type,
    //             'imageable_id' => $id,
    //         ];
    //     }
    //      $data = Image::insert($media);
    //      dd($data);
    //      return $data;
    // }

    // if ($request->hasFile('task_file')){
    //     $this->multipleFile($request->id ,$request->file('task_file'), $request->all(),'App\Models\Task');
    // }
    // else {}

    public function list()
    {
        $items = $this->projectRepository->getlist();
        $data = $items[0];
        $developer = $items[1];
        $manager = $items[2];
        return Inertia::render('Admin/Project/View',
        ['data' => $data , 'developer'=>$developer , 'manager'=>$manager]);
    }

    public function create()
    {
        $data = User::whereIn('user_role', ['junior_developer', 'senior_developer'])->get();
        $manager = User::whereIn('user_role', ['project_manager'])->get();
        return Inertia::render('Admin/Project/Create', ['developer' => $data, 'manager' => $manager]);
    }


    public function save(Request $request)
    {

      $this->projectRepository->save($request->all());
      return Redirect::route('admin.project.list');

    }

    public function details($id)
    {
       $allData = $this->projectRepository->detail($id);
       $data = $allData[0];
       $user = $allData[1];
       $task = $allData[2];

       return Inertia::render('Admin/Project/Detail', ['data' => $data, 'user' => $user,'task'=>$task ]);
    }


    public function edit($id)
    {
        $items = $this->projectRepository->edit($id);
        $data = $items[0];
        $devUsers = $items[1];
        $manager = $items[2];
        $developer = $items[3];
        return Inertia::render('Admin/Project/Edit',
        ['data' => $data, 'developer' => $devUsers,
        'manager' => $manager, 'devId' => $developer]);
    }




    public function update(EditProjectRequest $request, $id)
    {

        $this->projectRepository->update($id, $request->all());
        return Redirect::route('admin.project.list');
        // return  redirect()->back();
    }

    public function delete($id)
    {
        $data = Project::findOrFail($id);
        $data->delete();
        return redirect()->back();
    }

    public function project(){
        return Inertia::render('Admin/Project/ProjectTasks');
    }

    public function image(Request $request,$id){
        return $this->projectRepository->image($id, $request->all());
    }
}
