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
        return response()->json([
            'user' => Auth::user(),
            'authenticated' => Auth::check(),
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
            return response()->json([
                'message' => 'Успешная авторизация',
                'user' => Auth::user(),
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
        ]);

        Auth::login($user);
        $request->session()->regenerate();

        return response()->json([
            'message' => 'Регистрация успешно завершена',
            'user' => $user,
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
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'Пользователь с таким email не найден'], 404);
        }

        $tempPassword = 'Reset' . rand(1000, 9999) . '!';
        $user->password = Hash::make($tempPassword);
        $user->save();

        return response()->json([
            'message' => 'Пароль успешно сброшен! Ваш временный пароль: ' . $tempPassword,
            'temp_password' => $tempPassword,
        ]);
    }
}
