<?php

namespace App\Http\Controllers;

use App\Http\Requests\Admin\StoreOrderRequest;
use App\Models\Orders;
use Illuminate\Http\Request;

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
