<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCartRequest;
use App\Http\Requests\Admin\UpdateCartRequest;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartApiController extends Controller
{
    public function index($id) {
        $products = Cart::where('client_id', $id)->get();
        return response()->json([
            'status' => true,
            'isEmpty' => !isset($products),
            'products' => $products,
        ]);
    }

    public function addProduct(StoreCartRequest $request) {
        $product = Cart::create($request->all());
        return response()->json([
            'status' => true,
            'id' => $product->id,
            'message' => 'Успішно додано в корзину під номером ' . $product->id,
        ]);
    }

    public function updateProduct(UpdateCartRequest $request, $client, $product) {
        Cart::where('client_id', $client)->where('product_id', $product)->update($request->all());
        return response()->json([
            'status' => true,
            'message' => 'Успішно видалено товар',
        ]);
    }

    public function deleteProduct($client, $product) {
        Cart::where('client_id', $client)->where('product_id', $product)->delete();
        return response()->json([
            'status' => true,
            'message' => 'Успішно видалено товар',
        ]);
    }
}
