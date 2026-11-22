<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Log;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\IOFactory;

class ExcelController extends Controller
{
    public function upload(Request $request)
    {
        if (!$request->hasFile('file')) {
            return response()->json([
                'success' => false,
                'message' => 'Файл не был передан.',
            ], 422);
        }

        $file = $request->file('file');
        $extension = strtolower($file->getClientOriginalExtension());

        if (!in_array($extension, ['xlsx', 'xls'])) {
            return response()->json([
                'success' => false,
                'error_type' => 'INVALID_FORMAT',
                'message' => 'Неверный формат файла! Разрешены только файлы Excel с расширением .xlsx или .xls.',
                'allowed_formats' => ['.xlsx', '.xls'],
            ], 422);
        }

        $storedPath = $file->store('excel_uploads', 'local');
        $fullPath = Storage::disk('local')->path($storedPath);
        $importedCount = 0;
        $failedCount = 0;

        try {
            $spreadsheet = IOFactory::load($fullPath);
            $sheet = $spreadsheet->getActiveSheet();
            $rows = $sheet->toArray(null, true, true, true);

            $isFirstRow = true;
            foreach ($rows as $row) {
                if ($isFirstRow) {
                    $isFirstRow = false;
                    $colA = mb_strtolower(trim($row['A'] ?? ''));
                    if (in_array($colA, ['услуга', 'service', 'название', 'заказ'])) {
                        continue;
                    }
                }

                $service = trim($row['A'] ?? '');
                if (empty($service)) {
                    continue;
                }

                $weight = is_numeric($row['B'] ?? null) ? floatval($row['B']) : 5.0;
                $delivery = trim($row['C'] ?? '') ?: 'Заберу';
                $phone = trim($row['D'] ?? '') ?: '+375 29 000-00-00';
                $price = is_numeric($row['E'] ?? null) ? floatval($row['E']) : 8.0;
                $status = trim($row['F'] ?? '') ?: 'new';
                $notes = trim($row['G'] ?? '');

                if (!in_array($status, ['new', 'processing', 'done', 'cancelled'])) {
                    $status = 'new';
                }

                Order::create([
                    'service' => $service,
                    'weight' => $weight,
                    'delivery' => in_array($delivery, ['Заберу', 'Курьер']) ? $delivery : 'Заберу',
                    'phone' => $phone,
                    'price' => $price,
                    'status' => $status,
                    'notes' => $notes ?: 'Импортировано из Excel',
                    'user_id' => Auth::id(),
                ]);

                $importedCount++;
            }

            Log::create([
                'action' => 'Импорт Excel (import)',
                'entity_type' => 'Order',
                'entity_id' => null,
                'user_name' => Auth::user()?->name ?? 'Пользователь',
                'before_state' => null,
                'after_state' => [
                    'file' => $file->getClientOriginalName(),
                    'imported_orders' => $importedCount,
                ],
                'details' => "Успешно импортирован Excel-файл {$file->getClientOriginalName()} ({$importedCount} заказов прачечной)",
            ]);

            return response()->json([
                'success' => true,
                'message' => "Файл успешно сохранен в локальное хранилище и обработан! Загружено заказов прачечной: {$importedCount}.",
                'imported_count' => $importedCount,
                'file_path' => $storedPath,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при чтении Excel файла: ' . $e->getMessage(),
            ], 500);
        }
    }
}
