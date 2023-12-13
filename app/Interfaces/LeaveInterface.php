<?php

namespace App\Interfaces;

interface LeaveInterface
{
    public function save($data,$id);
    public function update($id,$data);
    public function detail($id);
}
