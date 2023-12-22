<?php

namespace App\Repositories;
use App\Interfaces\SalaryInterface;
use App\Models\Salary;


class SalaryRepository implements SalaryInterface
{

    public function getlist()
    {

    }

    public function create()
    {

    }

    public function save($data ,$id)
    {
       try {
        $salary = Salary::create([
            'user_id' => $id,
            'medical_and_conveyance' => $data['medical_conveyance'],
            'basic_salary' => $data['basic_salary'],
            'house_rent' => $data['house_rent'],
            'leave_travel_allowance' => $data['leave_allowance'],
            'statutory_bonus' => $data['statutory_bonus'],
            'tax_deducted_at_source' => $data['tax_deducted'],
            'gross_salary' => $data['gross_salary'],
            'provided_fund'=>$data['provided_fund'],
            'net_salary' => $data['net_salary'],
        ]);
        return $salary;
       } catch (\Throwable $th) {
        return ['success'=>false,'error'=>$th->getMessage()];
    }

    }

    public function detail($id)
    {

    }

    public function edit()
    {

    }

    public function update($data,$id)
    {
        try {
            $user = Salary::where('user_id',$id)->first();
            if($user)
            {
                dd($data);
                $salary = $user->update($data);
            }
            else
            {
             Salary::Create([
                'user_id' => $id,
                'medical_and_conveyance' => $data['medical_conveyance'],
                'basic_salary' => $data['basic_salary'],
                'house_rent' => $data['house_rent'],
                'leave_travel_allowance' => $data['leave_allowance'],
                'statutory_bonus' => $data['statutory_bonus'],
                'tax_deducted_at_source' => $data['tax_deducted'],
                'gross_salary' => $data['gross_salary'],
                'provided_fund'=>$data['provided_fund'],
                'net_salary' => $data['net_salary'],
            ]);
        }
            return ['success'=>true];

        } catch (\Throwable $th) {
            return ['success'=>false,'error'=>$th->getMessage()];
        }
    }
}
