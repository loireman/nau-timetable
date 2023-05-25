import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import axios from "axios";
import PrimaryButton from "@/Components/PrimaryButton";
import { useAsyncValue } from "react-router-dom";

export default function Dashboard({ auth }) {
    const [cartActive, setCartActive] = useState(false);
    const [Cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState([]);
    const [ordersActive, setOrdersActive] = useState(false);
    const [Orders, setOrders] = useState([]);

    async function fetchCart() {
        const response = await axios.get("/api/cart/" + auth.user.id);
        const products = response.data.products;
        setTotalPrice(response.data.totalPrice.toFixed(2));
        setCartActive(products.length != 0);
        setCart(products);
    }

    async function deleteFromCart(e, value) {
        e.preventDefault();
        if (cartActive == true) {
            await axios.delete("/api/cart/" + auth.user.id + "/" + value);
            fetchCart();
        }
    }

    async function fetchOrders() {
        const response = await axios.get("/api/orders/" + auth.user.id);
        const orders = response.data.orders;
        setOrdersActive(orders.length != 0);
        setOrders(orders);
    }

    async function order(e) {
        e.preventDefault()

        Date.prototype.addDays = function(days) {
            var currentDate = new Date(this.valueOf());
            currentDate.setDate(currentDate.getDate() + days);
            return currentDate;
        }

        var currentDate = new Date();

        const date = currentDate.addDays(5).toISOString().split("T")[0] + " " + currentDate.toISOString().split("T")[1].slice(0,8);


        axios.post("/api/orders/", {
            client_id: auth.user.id,
            total_price: totalPrice,
            status: 'Очікує підтвердження',
            arrival: date,
            products: JSON.stringify(Cart),
        });
        Cart.map(p => {deleteFromCart(e, p.product_id)})
        fetchOrders()
    }

    useEffect(() => {
        fetchCart();
        fetchOrders();
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
                        <div className="grid p-6 text-gray-900 dark:text-gray-100 w-full">
                            <span className="font-bold text-xl">Корзина</span>
                            <div className="flex gap-3 items-center p-3">
                                {(cartActive && (
                                    <div className="w-full flex flex-col-reverse justify-center">
                                        <div className="flex gap-3 w-[calc(88vw)] max-w-6xl items-center overflow-x-scroll">
                                            {Cart.reverse().map((p) => (
                                                <div
                                                    className="grid p-3 items-center h-96 w-48 rounded-lg border border-gray-600"
                                                    key={p.id}
                                                >
                                                    <img
                                                        src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                                                        alt="Front of men&#039;s Basic Tee in black."
                                                        class="object-cover object-center rounded-md"
                                                    />
                                                    <span className="font-bold text-2xl">
                                                        ${p.product_price}
                                                    </span>
                                                    <span className="mt-1 font-bold text-xl">
                                                        Id: {p.product_id}
                                                    </span>
                                                    <span className="font-bold text-xl">
                                                        К-сть: {p.product_count}
                                                    </span>
                                                    <PrimaryButton
                                                        className="mt-2 m-auto"
                                                        onClick={(e) =>
                                                            deleteFromCart(
                                                                e,
                                                                p.product_id
                                                            )
                                                        }
                                                    >
                                                        Прибрати
                                                    </PrimaryButton>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="border border-gray-600 p-6 rounded-lg my-3 flex max-sm:flex-col justify-between items-center gap-6">
                                            <span className="font-bold text-2xl">
                                                Загальна ціна: {totalPrice}
                                            </span>
                                            <PrimaryButton onClick={order}>
                                                <span className="text-lg">Замовити</span>
                                            </PrimaryButton>
                                        </div>
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
                            <div className="flex gap-3 items-center p-6">
                                {(ordersActive && (
                                    <div className="flex gap-3 w-[calc(88vw)] max-w-6xl items-center overflow-x-scroll">
                                    {Orders.sort((a, b) => b.id - a.id).map((order) => (
                                        <div
                                            className="grid p-3 items-center h-96 w-48 rounded-lg border border-gray-600"
                                            key={order.id}
                                        >
                                            <span className="font-bold text-2xl">
                                            Ордер: №{order.id}
                                            </span>
                                            <span className="font-bold text-xl">
                                            ${order.total_price}
                                            </span>
                                            <span className="font-bold text-xl">
                                                Статус доставки: {order.status}
                                            </span>
                                            <span className="font-bold text-xl">
                                                Прибуде: {order.arrival}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                )) || (
                                    <div className="m-auto grid gap-3">
                                        <span>
                                            Схоже що нічого не замовлено :(
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
