<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('salaries', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->float('basic_salary');
            $table->float('house_rent');
            $table->float('leave_travel_allowance');
            $table->float('medical_and_Conveyance');
            $table->float('statutory_bonus');
            $table->float('tax_deducted_at_source');
            $table->float('provided_fund');
            $table->float('gross_salary');
            $table->float('net_salary');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('salaries');
    }
};
