import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Icon } from "@iconify/react";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Tovar({ auth, tovar }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        tovar_id: tovar.id,
        tovar_count: 1,
    });

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
                <div className="max-w-5xl ml-20 sm:px-9s lg:px-8">
                    <div className="flex justify-between bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg text-gray-900 dark:text-gray-100">
                        <div>
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
                                    for="tovar_count"
                                    value="Замовити:"
                                />
                                <TextInput
                                    id="tovar_count"
                                    name="tovar_count"
                                    type="number"
                                    value={data.tovar_count}
                                    className="mt-1 block w-full"
                                    autoComplete="off"
                                    min="1"
                                    max={tovar.property2}
                                    isFocused={false}
                                    onChange={(e) =>
                                        setData("tovar_count", e.target.value)
                                    }
                                    required
                                />
                                <div className="flex items-stretch gap-3">
                                    <PrimaryButton>
                                        <span className="text-[0.9rem]">
                                            Замовити зараз
                                        </span>
                                    </PrimaryButton>
                                    <button className="grid content-center justify-center aspect-square px-2 h-full rounded-md text-gray-200 bg-orange-600 dark:bg-orange-700 hover:bg-orange-500 dark:hover:bg-orange-600 border border-orange-600">
                                        <span className="text-base">
                                            <Icon
                                                icon="mdi:cart"
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
                            class="h-24 object-cover object-center lg:h-96"
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
