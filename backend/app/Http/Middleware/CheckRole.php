<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    public function handle(Request $request, Closure $next, string $role)
{
    $authHeader = $request->header('Authorization');

    // If header missing or doesn't start with 'Bearer ', reject
    if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    // Remove "Bearer " prefix
    $token = substr($authHeader, 7);

    // Validate HR token
    if ($role === 'hr' && $token !== 'hr-secret-token') {
        return response()->json(['error' => 'HR access only'], 403);
    }

    // Validate Security token
    if ($role === 'security' && $token !== 'security-secret-token') {
        return response()->json(['error' => 'Security access only'], 403);
    }

    return $next($request);


    }
}