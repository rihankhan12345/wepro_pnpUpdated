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
            'medical_conveyance'=>['required','max:6'],
            'basic_salary' => ['required','max:6',],
            'house_rent' => ['required','max:6',],
            'leave_allowance' => ['required','max:6',],
            'statutory_bonus' => ['required','max:6',],
            'tax_deducted' => ['required','regex:/^\d{1,2}(\.\d{1,2})?$/'],
            'provided_fund' => ['required','max:6',],
            'gross_salary'=>['required','max:6'],
            'net_salary'=>['required','min:0','max:6','not_in:0'],
        ];
    }
}
