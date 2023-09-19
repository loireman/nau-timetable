import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/Admin/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Create({ auth, roles }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        roles: [],
    });

    const handleCheckers = (event) => {
        const value = parseInt(event.target.value);
        if (event.target.checked) {
            setData((prevItems) => ({
                ...prevItems,
                roles: [...prevItems.roles, value],
            }));
        } else {
            setData((prevItems) => ({
                ...prevItems,
                roles: prevItems.roles.filter((item) => item !== value),
            }));
        }
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("user.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-medium text-lg lg:text-2xl">
                    User create
                </h2>
            }
        >
            <Head title="User create" />

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
                        <InputLabel htmlFor="email" value="Пошта" />
                        <TextInput
                            id="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="mail"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                        <InputLabel htmlFor="password" value="Пароль" />
                        <TextInput
                            type="password"
                            id="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="password"
                            isFocused={true}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Підтвердіть пароль"
                        />
                        <TextInput
                        type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="password"
                            isFocused={true}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                        <div className="block mt-4">
                            {Object.entries(roles).map(([key, value]) => (
                                <label className="flex items-center">
                                    <Checkbox
                                        name={value}
                                        value={key}
                                        checked={data.roles.includes(
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
                            <span>Create</span>
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
