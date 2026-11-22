<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Log;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $perPage = 10;
        $orders = Order::with('user:id,name')
            ->orderBy('id', 'desc')
            ->paginate($perPage);

        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'service' => 'required|string',
            'weight' => 'required|numeric',
            'delivery' => 'required|string',
            'phone' => 'required|string|max:30',
            'status' => 'nullable|string',
            'price' => 'nullable|numeric',
            'notes' => 'nullable|string',
        ]);

        if (empty($validated['status'])) {
            $validated['status'] = 'new';
        }

        if (!isset($validated['price']) || $validated['price'] <= 0) {
            $validated['price'] = $this->calculatePrice($validated['service'], $validated['weight'], $validated['delivery']);
        }

        $validated['user_id'] = Auth::id();

        $order = Order::create($validated);

        Log::create([
            'action' => 'Добавление (create)',
            'entity_type' => 'Order',
            'entity_id' => $order->id,
            'user_name' => Auth::user()?->name ?? 'Клиент',
            'before_state' => null,
            'after_state' => $order->toArray(),
            'details' => "Создан заказ #{$order->id}: {$order->service}, {$order->weight} кг ({$order->price} BYN)",
        ]);

        return response()->json([
            'message' => 'Заказ успешно оформлен и добавлен в систему',
            'order' => $order,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        $before = $order->toArray();

        $validated = $request->validate([
            'service' => 'required|string',
            'weight' => 'required|numeric',
            'delivery' => 'required|string',
            'phone' => 'required|string|max:30',
            'status' => 'required|string',
            'price' => 'nullable|numeric',
            'notes' => 'nullable|string',
        ]);

        if (!isset($validated['price']) || $validated['price'] <= 0) {
            $validated['price'] = $this->calculatePrice($validated['service'], $validated['weight'], $validated['delivery']);
        }

        $order->update($validated);
        $after = $order->fresh()->toArray();

        Log::create([
            'action' => 'Редактирование (update)',
            'entity_type' => 'Order',
            'entity_id' => $order->id,
            'user_name' => Auth::user()?->name ?? 'Пользователь',
            'before_state' => $before,
            'after_state' => $after,
            'details' => "Обновлен заказ #{$order->id} (Статус: {$order->status}, {$order->service})",
        ]);

        return response()->json([
            'message' => 'Заказ успешно обновлен',
            'order' => $order,
        ]);
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $before = $order->toArray();

        $order->delete();

        Log::create([
            'action' => 'Удаление (delete)',
            'entity_type' => 'Order',
            'entity_id' => $id,
            'user_name' => Auth::user()?->name ?? 'Пользователь',
            'before_state' => $before,
            'after_state' => null,
            'details' => "Удален заказ #{$id} ({$before['service']}, {$before['phone']})",
        ]);

        return response()->json([
            'message' => 'Заказ успешно удален',
        ]);
    }

    private function calculatePrice(string $service, float $weight, string $delivery): float
    {
        $basePrices = [
            'Стирка' => 8.0,
            'Сушка' => 5.0,
            'Глажка' => 4.0,
            'Химчистка' => 20.0,
            'Стирка обуви' => 15.0,
            'Одеяла и пледы' => 18.0,
            'Деликатная стирка' => 10.0,
        ];

        $base = $basePrices[$service] ?? 8.0;
        $multiplier = 1.0;
        if ($weight >= 7) {
            $multiplier = 1.3;
        } elseif ($weight <= 3) {
            $multiplier = 0.9;
        }

        $price = $base * $multiplier;
        if ($delivery === 'Курьер') {
            $price += 5.0;
        }

        return round($price, 2);
    }
}
