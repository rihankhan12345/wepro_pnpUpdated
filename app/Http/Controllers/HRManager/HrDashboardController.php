<?php

namespace App\Http\Controllers\HRManager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class HrDashboardController extends Controller
{
    public function index(){
        return Inertia::Render('HRManager/Dashboard/View');
    }
}
