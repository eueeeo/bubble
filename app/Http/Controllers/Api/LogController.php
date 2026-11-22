<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Log;
use Illuminate\Http\Request;

class LogController extends Controller
{
    public function index(Request $request)
    {
        $logs = Log::orderBy('id', 'desc')->paginate(15);
        return response()->json($logs);
    }

    public function show($id)
    {
        $log = Log::findOrFail($id);
        return response()->json($log);
    }
}
