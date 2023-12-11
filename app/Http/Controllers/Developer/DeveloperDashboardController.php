<?php

namespace App\Http\Controllers\Developer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;


class DeveloperDashboardController extends Controller
{
    public function index(){
        return Inertia::render('Developer/Dashboard/View');
    }
}
