<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Role
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        if ($request->user()->user_role === $role) {
            return $next($request);
        } else if($role == 'developer') {
            return $next($request);
        }
        return response()->json(['msg' => 'Can not access this resource!'])->setStatusCode(402);
    }
}
