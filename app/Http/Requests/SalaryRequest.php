<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SalaryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'medical_conveyance'=>['required'],
            'basic_salary' => ['required'],
            'house_rent' => ['required'],
            'leave_allowance' => ['required'],
            'statutory_bonus' => ['required'],
            'tax_deducted' => ['required'],
            'provided_fund' => ['required'],
        ];
    }
}
