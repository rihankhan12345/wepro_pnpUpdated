<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Validation\Rules;
use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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

                'name' => ['required','string','max:255'],
                'email' => ['required','string','lowercase','email','max:255','unique:'.User::class],
                'user_role' => ['required','string'],
                'contact_no'=>['required','min:10','max:12'],
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
                'profile' => ['nullable','image','mimes:jpg,png','max:1024'],


        ];
    }
}
