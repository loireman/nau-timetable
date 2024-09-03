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
import { Icon } from "@iconify/react";

export default function Edit({
    auth,
    group,
    streams,
    substreams,
    group_streams,
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: "PUT",
        name: group.name,
        stream_id: group.stream_id ?? null,
        substream_id: group.substream_id ?? null,
        single_week: !!group.single_week ?? false,
        single_group: !!group.single_group ?? false,
    });

    // Initialize isEnabled based on the initial data stream_id value
    const [isEnabled, setIsEnabled] = useState(group.stream_id === null);
    const streamLocked = group_streams.length > 0;

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
        if (streamLocked) return;
        if (newValue === true) {
            setData("stream_id", null);
        } else {
            setData("substream_id", null);
        }
        setIsEnabled(newValue);
    };

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
                    {streamLocked && (
                        <div className="px-8 py-4 bg-orange-200 text-orange-700 rounded-2xl">
                            <p>
                                Зміна типу групи неможлива, наявні групи що
                                активні:
                            </p>
                            {group_streams.map((group, index) => (
                                <div key={index}>
                                    <a
                                        href={route("group.edit", group.id)}
                                        target="blank"
                                    >
                                        {group.name}
                                        <Icon
                                            className="inline align-top"
                                            icon="mdi:external-link"
                                        />
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                    <form className="px-4 py-8" onSubmit={submit}>
                        <div className="mt-3 flex justify-around overflow-clip rounded-lg border bg-gray-100 border-gray-500">
                            <div
                                className={`${
                                    !isEnabled
                                        ? streamLocked
                                            ? "bg-gray-600 text-white"
                                            : "bg-blue-600 text-white"
                                        : ""
                                } w-1/2 p-3 text-center font-semibold rounded-md max-md:truncate overflow-hidden`}
                                onClick={() => changeGroupType(false)}
                            >
                                Поток
                            </div>
                            <div
                                className={`${
                                    isEnabled ? "bg-blue-600 text-white" : ""
                                } w-1/2 p-3 text-center font-semibold rounded-md max-md:truncate overflow-hidden`}
                                onClick={() => changeGroupType(true)}
                            >
                                Група
                            </div>
                        </div>

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
                                <div className="mt-3">
                                    <InputSwitch
                                        label={
                                            <span className="font-semibold">
                                                Без поділу на тижні
                                            </span>
                                        }
                                        initialValue={data.single_week}
                                        onChange={() =>
                                            setData(
                                                "single_week",
                                                !data.single_week
                                            )
                                        }
                                    />
                                </div>
                                <div className="mt-3">
                                    <InputSwitch
                                        label={
                                            <span className="font-semibold">
                                                Без поділу на підгрупи
                                            </span>
                                        }
                                        initialValue={data.single_group}
                                        onChange={() =>
                                            setData(
                                                "single_group",
                                                !data.single_group
                                            )
                                        }
                                    />
                                </div>
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
