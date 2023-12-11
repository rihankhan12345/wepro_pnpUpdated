<?php

namespace App\Providers;
use App\Interfaces\UserInterface;
use App\Repositories\UserRepository;
use App\Interfaces\ProjectInterface;
use App\Repositories\ProjectRepository;
use App\Interfaces\TaskInterface;
use App\Repositories\TaskRepository;
use App\Interfaces\SalaryInterface;
use App\Repositories\SalaryRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserInterface::class,UserRepository::class);
        $this->app->bind(ProjectInterface::class,ProjectRepository::class);
        $this->app->bind(TaskInterface::class,TaskRepository::class);
        $this->app->bind(SalaryInterface::class,SalaryRepository::class);


    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
