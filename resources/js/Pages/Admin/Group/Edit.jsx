import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/Admin/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import Select from "@/Components/Select";
import InputSwitch from "@/Components/InputSwitch";

export default function Edit({ auth, group, streams, substreams }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: "PUT",
        name: group.name,
        stream_id: group.stream_id ?? null,
        substream_id: group.substream_id ?? null,
    });

    // Initialize isEnabled based on the initial data stream_id value
    const [isEnabled, setIsEnabled] = useState(group.stream_id === null);

    const submit = (e) => {
        e.preventDefault();
        Inertia.put(route("group.update", { group: group }), data);
    };

    const handleStreamChange = (newValue) => {
        setData("stream_id", newValue);
    };

    const handleSubStreamChange = (newValue) => {
        setData("substream_id", newValue);
    };

    const changeGroupType = (newValue) => {
        if (newValue === true) {
            setData("stream_id", null);
        } else {
            setData("substream_id", null);
        }
        setIsEnabled(newValue);
    };

    console.log(errors);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-medium text-lg lg:text-2xl">group edit</h2>
            }
        >
            <Head title="group edit" />

            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form className="px-4 py-8" onSubmit={submit}>
                        <InputLabel htmlFor="name" value="Is group" />
                        <InputSwitch
                            initialValue={isEnabled}
                            onChange={changeGroupType}
                        />

                        <InputLabel htmlFor="name" value="group name" />
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

                        {isEnabled ? (
                            <>
                                <InputLabel
                                    className="mt-3"
                                    htmlFor="substream_id"
                                    value="Sub Stream"
                                />
                                <Select
                                    options={substreams}
                                    defaultValue="Виберіть поток групи"
                                    defaultSelectable={false}
                                    value={data.substream_id}
                                    onChange={handleSubStreamChange}
                                />
                            </>
                        ) : (
                            <>
                                <InputLabel
                                    className="mt-3"
                                    htmlFor="stream_id"
                                    value="Stream"
                                />
                                <Select
                                    options={streams}
                                    defaultValue="Виберіть поток"
                                    defaultSelectable={false}
                                    value={data.stream_id}
                                    onChange={handleStreamChange}
                                />
                            </>
                        )}
                        <InputError
                            message={errors.stream_id}
                            className="mt-2"
                        />

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
