import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/Admin/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Edit({ auth, permission }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: "PUT",
        name: permission.name,
    });

    const submit = (e) => {
        e.preventDefault();

        Inertia.put(
            route("permission.update", { permission: permission }),
            data
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Редагування правила доступу
                </h2>
            }
        >
            <Head title="Редагування правила доступу" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-4 dark:text-gray-300 text-gray-800">
                        <span className="text-xl font-semibold">
                            Редагувати правило доступу
                        </span>
                        <form className="px-4 py-8" onSubmit={submit}>
                            <InputLabel htmlFor="name" value="Назва" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.name}
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
