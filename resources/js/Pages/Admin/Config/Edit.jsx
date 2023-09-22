import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/Admin/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Edit({ auth, config }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: "PUT",
        name: config.name,
        value: config.value,
    });

    const submit = (e) => {
        e.preventDefault();

        Inertia.put(route("config.update", { config: config }), data);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-medium text-lg lg:text-2xl">config edit</h2>
            }
        >
            <Head title="config edit" />

            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form className="px-4 py-8" onSubmit={submit}>
                        <InputLabel htmlFor="name" value="Назва" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => {
                                const newValue = e.target.value.replace(/ /g, "_").toLowerCase();
                                setData("name", newValue);
                            }}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />

                        <InputLabel
                            className="mt-4"
                            htmlFor="value"
                            value="Config value"
                        />
                        <TextInput
                            id="value"
                            name="value"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.value}
                            onChange={(e) => setData("value", e.target.value)}
                        />
                        <InputError message={errors.value} className="mt-2" />

                        <PrimaryButton
                            className="mt-16 w-full grid"
                            disabled={processing}
                        >
                            <span>Update</span>
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
