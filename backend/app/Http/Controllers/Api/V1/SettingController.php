<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingController
{
    public function index(Request $request): JsonResponse
    {
        return response()->json(['data' => []]);
    }

    public function update(Request $request): JsonResponse
    {
        return response()->json(['data' => $request->all()]);
    }
}