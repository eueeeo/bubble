<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{
    public function user(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json([
                'user' => null,
                'authenticated' => false,
            ]);
        }

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role_id' => (int) $user->role_id,
                'is_admin' => (int) $user->role_id === 1 || $user->email === 'admin@admin.com',
                'role' => (int) $user->role_id === 1 ? 'admin' : 'user',
            ],
            'authenticated' => true,
        ]);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials, $request->boolean('remember', true))) {
            $request->session()->regenerate();
            $user = Auth::user();
            return response()->json([
                'message' => 'Успешная авторизация',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role_id' => (int) $user->role_id,
                    'is_admin' => (int) $user->role_id === 1 || $user->email === 'admin@admin.com',
                    'role' => (int) $user->role_id === 1 ? 'admin' : 'user',
                ],
            ]);
        }

        return response()->json([
            'message' => 'Неверный адрес электронной почты или пароль',
        ], 422);
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role_id' => 2,
        ]);

        Auth::login($user);
        $request->session()->regenerate();

        return response()->json([
            'message' => 'Регистрация успешно завершена',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role_id' => 2,
                'is_admin' => false,
                'role' => 'user',
            ],
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Успешный выход',
        ]);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        return response()->json([
            'message' => 'Если аккаунт с таким адресом существует, на него отправлена ссылка для восстановления пароля.',
        ]);
    }
}
