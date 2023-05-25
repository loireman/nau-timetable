import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/Admin/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function EditTovary({ auth, orders }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        client_id: orders.client_id,
        total_price: orders.total_price,
        status: orders.status,
        arrival: orders.arrival,
        products: orders.products,
    });

    const submit = (e) => {
        e.preventDefault();

        Inertia.put(route("orders.update", { order: orders }), data);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Оновлення замовлення
                </h2>
            }
        >
            <Head title="Оновлення замовлення" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-4 dark:text-gray-300 text-gray-900">
                        <span className="text-xl font-semibold">
                            Оновити замовлення
                        </span>
                        <form className="px-4 py-8" onSubmit={submit}>
                            <InputLabel value="Ід клієнта" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.client_id}
                                className="mt-1 block w-full bg-gray-300 dark:bg-gray-600"
                                disabled
                            />
                            <InputLabel value="Ціна замовлення" />
                            <TextInput
                                id="total_price"
                                name="total_price"
                                value={data.total_price}
                                className="mt-1 block w-full bg-gray-300 dark:bg-gray-600"
                                disabled
                            />

                            <InputLabel value="Товари" />
                            <div className="flex gap-3 w-[calc(70vw)] md:w-[calc(80vw)] max-w-6xl items-center overflow-x-scroll">
                                {JSON.parse(data.products)
                                    .map((p) => (
                                        <div
                                            className="grid p-3 items-center h-36 w-48 rounded-lg border border-gray-600"
                                            key={p.id}
                                        >
                                            <span className="font-bold text-xl">
                                                Id: {p.product_id}
                                            </span>
                                            <span className="font-bold text-xl">
                                                К-сть: {p.product_count}
                                            </span>
                                            <span className="font-bold text-xl">
                                                ${p.product_price}
                                            </span>
                                        </div>
                                    ))}
                            </div>

                            <InputLabel
                                htmlFor="status"
                                value="Статус замовлення"
                            />
                            <TextInput
                                id="status"
                                name="status"
                                type="text"
                                value={data.status}
                                className="mt-1 block w-full"
                                autoComplete="status"
                                isFocused={false}
                                onChange={(e) =>
                                    setData("status", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.status}
                                className="mt-2"
                            />
                            <InputLabel
                                htmlFor="arrival"
                                value="Дата прибуття"
                            />
                            <TextInput
                                id="arrival"
                                name="arrival"
                                type="date"
                                value={data.arrival}
                                className="mt-1 block w-full"
                                autoComplete="arrival"
                                isFocused={false}
                                onChange={(e) =>
                                    setData("arrival", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.status}
                                className="mt-2"
                            />

                            <PrimaryButton
                                className="mt-16 w-full grid"
                                disabled={processing}
                            >
                                <span className="text-[1rem]">Оновити</span>
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
