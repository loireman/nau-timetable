import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import axios from "axios";
import PrimaryButton from "@/Components/PrimaryButton";
import { useAsyncValue } from "react-router-dom";

export default function Dashboard({ auth }) {
    const [cartActive, setCartActive] = useState(false);
    const [Cart, setCart] = useState([]);
    const [ordersActive, setOrdersActive] = useState(false);
    const [Orders, setOrders] = useState([]);

    async function fetchCart() {
        const response = await axios.get("/api/cart/" + auth.user.id);
        const products = response.data.products;
        setCartActive(products.length != 0);
        setCart(products);
    }
    async function fetchOrders() {
        const response = await axios.get("/api/orders/" + auth.user.id);
        const orders = response.data.orders;
        setOrdersActive(orders.length != 0);
        setOrders(orders);
    }

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="grid p-6 text-gray-900 dark:text-gray-100">
                            <span className="font-bold text-xl">Корзина</span>
                            <div className="flex gap-3 h-64 items-center p-6">
                                {(cartActive && (
                                    <div className="flex gap-3 h-full items-center">
                                        {Cart.reverse().map((p) => (
                                            <div className="grid p-6 items-center w-48 rounded-lg h-full border border-gray-600" key={p.id}>
                                                Id: {p.product_id}
                                                <span className="font-bold text-2xl">${p.product_price}</span>
                                                К-сть: {p.product_count}
                                            </div>
                                        ))}
                                    </div>
                                )) || (
                                    <div className="m-auto grid gap-3">
                                        <span>
                                            Схоже що наразі ваша корзина пуста
                                            :(
                                        </span>
                                        <a href="/products" className="m-auto">
                                            <PrimaryButton>
                                                До товарів
                                            </PrimaryButton>
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="grid p-6 text-gray-900 dark:text-gray-100">
                            <span className="font-bold text-xl">
                                Замовлення
                            </span>
                            <div className="flex gap-3 h-64 items-center p-6">
                                {(ordersActive && (
                                    <div className="flex gap-3 h-full items-center">
                                        {Orders.reverse().map((order) => (
                                            <div className="grid p-6 items-center w-48 rounded-lg h-full border border-gray-600" key={order.id}>
                                                Номер ордеру: №{order.id}
                                                <span className="font-bold text-2xl">${order.product_price}</span>
                                                Статус доставки: {order.status}
                                                Прибуде: {order.arriveDate}
                                            </div>
                                        ))}
                                    </div>
                                )) || (
                                    <div className="m-auto grid gap-3">
                                        <span>
                                            Схоже що нічого не замовлено
                                            :(
                                        </span>
                                        <a href="/products" className="m-auto">
                                            <PrimaryButton>
                                                До товарів
                                            </PrimaryButton>
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
