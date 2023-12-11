<?php

namespace App\Interfaces ;

interface SalaryInterface
{
    public function getlist();
    public function create();
    public function save($data ,$id);
    public function detail($id);
    public function edit();
    public function update();

}

