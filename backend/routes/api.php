<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VisitorController;

Route::post('/login', function (Request $request) {
    $credentials = $request->only('username', 'password');
    
    // HR login
    if ($credentials['username'] === 'Hr' && $credentials['password'] === 'Hr') {
        return response()->json([
            'role' => 'hr',
            'token' => 'hr-secret-token',
            'redirect' => '/hr-dashboard'
        ]);
    }
    
    // Security login
    if ($credentials['username'] === 'Sc' && $credentials['password'] === 'Sc') {
        return response()->json([
            'role' => 'security',
            'token' => 'security-secret-token',
            'redirect' => '/security-dashboard'
        ]);
    }
    
    return response()->json(['error' => 'Invalid credentials'], 401);
});

// Protected routes
Route::middleware(['role:security'])->group(function () {
    Route::post('/visitors', [VisitorController::class, 'store']);
});

Route::middleware(['role:hr'])->group(function () {
    Route::get('/visitors', [VisitorController::class, 'index']);
    Route::get('/visitors/{id}', [VisitorController::class, 'show']);
    Route::put('/visitors/{id}', [VisitorController::class, 'update']);
    Route::delete('/visitors/{id}', [VisitorController::class, 'destroy']);
});