<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $users = User::query()
            ->when($request->filled('search'), function ($query) use ($request) {
                $term = $request->string('search');
                $query->where(fn ($user) => $user->where('name', 'like', "%{$term}%")
                    ->orWhere('email', 'like', "%{$term}%")
                    ->orWhere('phone', 'like', "%{$term}%"));
            })
            ->latest()
            ->paginate($request->integer('per_page', 10));

        return response()->json(['data' => $users]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:30', 'unique:users,phone'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
            'role' => ['sometimes', 'in:user,admin'],
        ]);
        $validated['password'] = Hash::make($validated['password']);

        return response()->json(['data' => User::create($validated)], 201);
    }

    public function update(Request $request, User $user): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'phone' => ['sometimes', 'string', 'max:30', 'unique:users,phone,' . $user->id],
            'email' => ['sometimes', 'email', 'max:255', 'unique:users,email,' . $user->id],
            'role' => ['sometimes', 'in:user,admin'],
        ]);
        $user->update($validated);

        return response()->json(['data' => $user->fresh()]);
    }

    public function destroy(User $user): JsonResponse
    {
        abort_if($user->role === 'admin', 422, 'The administrator cannot be deleted.');
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}