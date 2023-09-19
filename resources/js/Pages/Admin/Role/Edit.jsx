import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/Admin/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Edit({ auth, role, permissions, roleHasPermissions }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: "PUT",
        name: role.name,
        permissions: roleHasPermissions,
    });
    const handleCheckers = (event) => {
        const value = parseInt(event.target.value);
        if (event.target.checked) {
            setData((prevItems) => ({
                ...prevItems,
                permissions: [...prevItems.permissions, value],
            }));
        } else {
            setData((prevItems) => ({
                ...prevItems,
                permissions: prevItems.permissions.filter(
                    (item) => item !== value
                ),
            }));
        }
    };

    const submit = (e) => {
        e.preventDefault();

        Inertia.put(route("role.update", { role: role }), data);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Role edit
                </h2>
            }
        >
            <Head title="Role edit" />

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
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                        <div className="block mt-4">
                            {Object.entries(permissions).map(([key, value]) => (
                                <label className="flex items-center">
                                    <Checkbox
                                        name={key}
                                        value={key}
                                        checked={data.permissions.includes(
                                            parseInt(key)
                                        )}
                                        onChange={handleCheckers}
                                    />
                                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                        {value}
                                    </span>
                                </label>
                            ))}
                        </div>

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
