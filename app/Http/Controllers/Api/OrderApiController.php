<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Admin\StoreOrderRequest;
use App\Models\Orders;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OrderApiController extends Controller
{
    public function index($id) {
        $orders = Orders::where('client_id', $id)->get();
        return response()->json([
            'status' => true,
            'orders' => $orders,
        ]);
    }

    public function addOrder(StoreOrderRequest $request) {
        $order = Orders::create($request->all());
        return response()->json([
            'status' => true,
            'message' => 'Успішно оформлено замовлення ' . $order->id,
        ]);
    }
}
