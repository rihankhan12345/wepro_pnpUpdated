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
            'net_salary'=>['required','min:0','not_in:0','regex:/^\d{1,6}(\.\d{1,5})?$/'],
        ];
    }
    public function messages()
    {
        return [
            'tax_deducted.regex:/^\d{1,2}(\.\d{1,2})?$/' => 'Tax field contained only two digit before point',
        ];
    }
}

// 'medical_conveyance'=>['required','min:0','regex:/^\d{1,6}(\.\d{1,5})?$/'],
// 'basic_salary' => ['required','min:0','regex:/^\d{1,6}(\.\d{1,5})?$/',],
// 'house_rent' => ['required','min:0','regex:/^\d{1,6}(\.\d{1,5})?$/',],
// 'leave_allowance' => ['required','min:0','regex:/^\d{1,6}(\.\d{1,5})?$/',],
// 'statutory_bonus' => ['required','min:0','regex:/^\d{1,6}(\.\d{1,5})?$/',],
// 'tax_deducted' => ['required','min:0','regex:/^\d{1,2}(\.\d{1,2})?$/'],
// 'provided_fund' => ['required','min:0','regex:/^\d{1,6}(\.\d{1,5})?$/',],
// 'gross_salary'=>['required','min:0','regex:/^\d{1,6}(\.\d{1,5})?$/'],
// 'net_salary'=>['required','min:0','not_in:0','regex:/^\d{1,6}(\.\d{1,5})?$/'],
