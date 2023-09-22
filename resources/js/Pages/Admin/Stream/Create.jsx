import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Select from "@/Components/Select";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/Admin/AdminLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Create({ auth, departments }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        course: 1,
        department_id: 1,
    });
    const submit = (e) => {
        e.preventDefault();

        post(route("stream.store"));
    };

    const handleSelectChange = (newValue) => {
        setData("department_id", newValue);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-medium text-lg lg:text-2xl">
                    Stream create
                </h2>
            }
        >
            <Head title="Stream create" />

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

                        <PrimaryButton
                            className="mt-16 w-full grid"
                            disabled={processing}
                        >
                            <span className="text-[1rem]">Create</span>
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
