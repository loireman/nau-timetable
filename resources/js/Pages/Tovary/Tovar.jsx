import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Icon } from "@iconify/react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";

export default function Tovar({ auth, tovar }) {
    const [cartActive, setCartActive] = useState(false);
    const [productCount, setProductCount] = useState(1);

    async function fetchData() {
        const response = await fetch("/api/cart/" + auth.user.id);
        const json = await response.json();
        const products = json.products.filter((element) => {
            return element.product_id == tovar.id;
        });
        setCartActive(products.length != 0);
        if (products.length != 0) {
            setProductCount(products[0].product_count);
        }
    }
    fetchData();

    async function addToCart(e, value) {
        e.preventDefault();
        if (value == 0) {
            if (cartActive == true) {
                await axios.delete(
                    "/api/cart/" + auth.user.id + "/" + tovar.id
                );
            } else {
                await axios.post("/api/cart/", {
                    client_id: auth.user.id,
                    product_id: tovar.id,
                    product_count: productCount,
                });
            }
        } else {
            await axios.delete(
                "/api/cart/" + auth.user.id + "/" + tovar.id
            );
            setProductCount(value == 1 ? productCount - 1 : productCount + 1)
        }
        fetchData();
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Інформація про товар
                </h2>
            }
        >
            <Head title="Інформація про товар" />

            <div className="py-12">
                <div className="max-w-5xl sm:px-9s lg:px-8">
                    <div className="flex max-md:flex-col-reverse justify-between bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg text-gray-900 dark:text-gray-100">
                        <div className="p-6">
                            <div className="p-6 font-bold text-2xl">
                                {tovar.name}
                            </div>
                            <div className="mt-3 ml-5 text-xl font-medium">
                                Ціна: ${tovar.price}
                            </div>
                            <div className="ml-5 text-xl font-medium">
                                Тип: {tovar.property1}
                            </div>
                            <div className="ml-5 text-xl font-medium">
                                Кількість: {tovar.property2}
                            </div>
                            <div className="grid gap-3 mt-5 ml-5">
                                <InputLabel
                                    className="text-xl"
                                    for="productCount"
                                    value="Замовити:"
                                />
                                <div className="flex gap-3 items-center">
                                    <span className="font-bold text-2xl">
                                        {productCount}
                                    </span>
                                    <button
                                        onClick={(e) => addToCart(e, 1)}
                                        className="grid content-center justify-center aspect-square px-2 h-full
                                        rounded-md text-gray-200 border bg-gray-600 dark:bg-gray-700
                                        hover:bg-gray-500 dark:hover:bg-gray-600 border-gray-600"
                                    >
                                        <span className="text-base">
                                            <Icon
                                                icon="mdi:minus"
                                                height={24}
                                                width={24}
                                            />
                                        </span>
                                    </button>
                                    <button
                                        onClick={(e) => addToCart(e, 2)}
                                        className="grid content-center justify-center aspect-square px-2 h-full
                                        rounded-md text-gray-200 border bg-gray-600 dark:bg-gray-700
                                        hover:bg-gray-500 dark:hover:bg-gray-600 border-gray-600"
                                    >
                                        <span className="text-base">
                                            <Icon
                                                icon="mdi:plus"
                                                height={24}
                                                width={24}
                                            />
                                        </span>
                                    </button>
                                </div>
                                <div className="flex items-stretch gap-3">
                                    <PrimaryButton>
                                        <span className="text-[0.9rem]">
                                            Замовити зараз
                                        </span>
                                    </PrimaryButton>
                                    <button
                                        onClick={(e) => addToCart(e, 0)}
                                        className={
                                            "grid content-center justify-center aspect-square px-2 h-full rounded-md text-gray-200 border " +
                                            (cartActive === true
                                                ? "bg-green-600 dark:bg-green-700 hover:bg-green-500 dark:hover:bg-green-600 border-green-600"
                                                : "bg-orange-600 dark:bg-orange-700 hover:bg-orange-500 dark:hover:bg-orange-600 border-orange-600")
                                        }
                                    >
                                        <span className="text-base">
                                            <Icon
                                                icon={
                                                    cartActive === true
                                                        ? "mdi:done"
                                                        : "mdi:cart"
                                                }
                                                height={24}
                                                width={24}
                                            />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <img
                            src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                            alt="Front of men&#039;s Basic Tee in black."
                            class="h=full aspect-square md:h-96 object-cover object-center lg:h-[36rem]"
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
