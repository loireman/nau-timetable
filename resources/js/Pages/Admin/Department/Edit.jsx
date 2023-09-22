import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/Admin/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Edit({ auth, department }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: "PUT",
        name: department.name,
        short: department.short,
        chief: department.chief,
    });

    const submit = (e) => {
        e.preventDefault();

        Inertia.put(
            route("department.update", { department: department }),
            data
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-medium text-lg lg:text-2xl">Department edit</h2>}
        >
            <Head title="Department edit" />

            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form className="px-4 py-8" onSubmit={submit}>
                    <InputLabel htmlFor="name" value="Department name" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />

                        <InputLabel
                            className="mt-3"
                            htmlFor="short"
                            value="Department short"
                        />
                        <TextInput
                            id="short"
                            name="short"
                            value={data.short}
                            className="mt-1 block w-full"
                            autoComplete="chief"
                            isFocused={true}
                            onChange={(e) => setData("short", e.target.value)}
                            required
                        />
                        <InputError message={errors.short} className="mt-2" />

                        <InputLabel
                            className="mt-3"
                            htmlFor="chief"
                            value="Department chief"
                        />
                        <TextInput
                            id="chief"
                            name="chief"
                            value={data.chief}
                            className="mt-1 block w-full"
                            autoComplete="chief"
                            isFocused={true}
                            onChange={(e) => setData("chief", e.target.value)}
                            required
                        />
                        <InputError message={errors.chief} className="mt-2" />
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
