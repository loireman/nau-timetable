import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/Admin/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import Select from "@/Components/Select";

export default function Edit({ auth, stream, departments }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: "PUT",
        name: stream.name,
        course: stream.course,
        department_id: stream.department_id,
    });

    const submit = (e) => {
        e.preventDefault();

        Inertia.put(
            route("stream.update", { stream: stream }),
            data
        );
    };

    const handleSelectChange = (newValue) => {
        setData("department_id", newValue);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-medium text-lg lg:text-2xl">
                    Stream edit
                </h2>
            }
        >
            <Head title="Stream edit" />

            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form className="px-4 py-8" onSubmit={submit}>
                        <InputLabel htmlFor="name" value="Stream name" />
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
                            value="Course"
                        />
                        <TextInput
                            id="course"
                            name="course"
                            type="number"
                            min="1"
                            max="6"
                            value={data.course}
                            className="mt-1 block w-full"
                            autoComplete="course"
                            isFocused={true}
                            onChange={(e) => setData("course", e.target.value)}
                            required
                        />
                        <InputError message={errors.course} className="mt-2" />

                        <InputLabel
                            className="mt-3"
                            htmlFor="department_id"
                            value="Department"
                        />

                        <Select
                            options={departments}
                            defaultValue="Виберіть факультет"
                            defaultSelectable={false}
                            value={data.department_id}
                            onChange={handleSelectChange}
                        />
                        <InputError message={errors.department_id} className="mt-2" />

                        <PrimaryButton
                            className="mt-16 w-full grid"
                            disabled={processing}
                        >
                            <span className="text-[1rem]">Update</span>
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
