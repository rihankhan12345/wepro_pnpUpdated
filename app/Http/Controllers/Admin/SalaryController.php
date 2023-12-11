<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\SalaryRequest;
use App\Interfaces\SalaryInterface;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\SalaryRepository;
use Inertia\Inertia;


class SalaryController extends Controller
{
    private SalaryInterface $salaryRepository;

    public function __construct(SalaryInterface $salaryRepository) {
        $this->salaryRepository = $salaryRepository;
    }

    public function create()
    {
        return Inertia::Render('Admin/Salary/Create');
    }

    public function save(SalaryRequest $request ,$id)
    {
        $data = $this->salaryRepository->save($request->all() ,$id);
        return Redirect::route('admin.user.list');
    }
}
