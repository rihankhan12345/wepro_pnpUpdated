<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            // Check if the user has the "admin" role
            if (Auth::user()->role === 'admin') {
                // User has the "admin" role, redirect to the admin dashboard
                return redirect()->route('admin.dashboard');
            }
        }

        // User does not have the "admin" role, proceed with the request
        return $next($request);    }
}
