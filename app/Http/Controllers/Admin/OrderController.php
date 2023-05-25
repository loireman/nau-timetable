<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreOrderRequest;
use App\Http\Requests\Admin\UpdateOrderRequest;
use App\Models\Orders;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * create a new instance of the class
     *
     * @return void
     */
    function __construct()
    {
        $this->middleware('can:tovary list', ['only' => ['index', 'show']]);
        $this->middleware('can:tovary edit', ['only' => ['edit', 'update']]);
        $this->middleware('can:tovary delete', ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $orders = (new Orders)->newQuery();
        if (request()->has('search')) {
            $orders->where('id', 'Like', '%' . request()->input('search') . '%')->orWhere('client_id', 'Like', '%' . request()->input('search') . '%')
            ->orWhere('arrival', 'Like', '%' . request()->input('search') . '%');
        }
        if (request()->query('sort')) {
            $attribute = request()->query('sort');
            $sort_order = 'ASC';
            if (strncmp($attribute, '-', 1) === 0) {
                $sort_order = 'DESC';
                $attribute = substr($attribute, 1);
            }
            $orders->orderBy($attribute, $sort_order);
        } else {
            $orders->latest();
        }
        $orders = $orders->paginate(10)->onEachSide(2)->appends(request()->query());
        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
            'filters' => request()->all('search'),
            'can' => [
                'edit' => Auth::user()->can('orders edit'),
                'delete' => Auth::user()->can('orders delete'),
            ]
        ]);
    }

    public function edit($orders)
    {
        $orders = Orders::where('id', $orders)->first();
        return Inertia::render('Admin/Orders/Edit', [
            'orders' => $orders
        ]);
    }

    public function show($orders)
    {
        $orders = Orders::where('id', $orders)->first();
        return Inertia::render('Admin/Orders/Show', [
            'orders' => $orders,
        ]);
    }

    public function update(UpdateOrderRequest $request, $orders)
    {
        Orders::where('id', $orders)->update($request->all());
        return redirect()->route('orders.index')
            ->with('message', __('Order updated successfully.'));
    }

    public function destroy($orders)
    {
        Orders::where('id', $orders)->delete();

        return redirect()->route('orders.index')
            ->with('message', __('Order deleted successfully'));
    }
}
