<?php

namespace App\Http\Controllers\HRManager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\SalaryRequest;
use App\Interfaces\SalaryInterface;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\SalaryRepository;
use Inertia\Inertia;

class HrSalaryController extends Controller
{
    private SalaryInterface $salaryRepository;

    public function __construct(SalaryInterface $salaryRepository) {
        $this->salaryRepository = $salaryRepository;
    }

    public function create()
    {
        return Inertia::Render('HRManager/Salary/Create');
    }

    public function save(SalaryRequest $request ,$id)
    {
        $data = $this->salaryRepository->save($request->all() ,$id);
        return Redirect::route('hrManager.user.list');
    }
    public function update(SalaryRequest $request,$id)
    {
        $this->salaryRepository->update($request->all(),$id);
        return back();
    }
}
