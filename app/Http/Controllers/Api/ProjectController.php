<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Log;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $perPage = 10;
        $page = $request->query('page', 1);

        $projects = Project::orderBy('id', 'desc')->paginate($perPage);

        return response()->json($projects);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string',
            'start_date' => 'nullable|date',
            'deadline' => 'nullable|date',
            'budget' => 'nullable|numeric',
        ]);

        $project = Project::create($validated);

        Log::create([
            'action' => 'Добавление (create)',
            'entity_type' => 'Project',
            'entity_id' => $project->id,
            'user_name' => Auth::user()?->name ?? 'Пользователь',
            'before_state' => null,
            'after_state' => $project->toArray(),
            'details' => 'Создан проект: ' . $project->title,
        ]);

        return response()->json([
            'message' => 'Проект успешно добавлен',
            'project' => $project,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);
        $before = $project->toArray();

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string',
            'start_date' => 'nullable|date',
            'deadline' => 'nullable|date',
            'budget' => 'nullable|numeric',
        ]);

        $project->update($validated);
        $after = $project->fresh()->toArray();

        Log::create([
            'action' => 'Редактирование (update)',
            'entity_type' => 'Project',
            'entity_id' => $project->id,
            'user_name' => Auth::user()?->name ?? 'Пользователь',
            'before_state' => $before,
            'after_state' => $after,
            'details' => 'Обновлен проект #' . $project->id . ' (' . $project->title . ')',
        ]);

        return response()->json([
            'message' => 'Проект успешно обновлен',
            'project' => $project,
        ]);
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $before = $project->toArray();

        $project->delete();

        Log::create([
            'action' => 'Удаление (delete)',
            'entity_type' => 'Project',
            'entity_id' => $id,
            'user_name' => Auth::user()?->name ?? 'Пользователь',
            'before_state' => $before,
            'after_state' => null,
            'details' => 'Удален проект #' . $id . ' (' . ($before['title'] ?? '') . ')',
        ]);

        return response()->json([
            'message' => 'Проект успешно удален',
        ]);
    }
}
