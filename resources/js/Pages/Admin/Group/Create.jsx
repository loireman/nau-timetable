import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import InputSwitch from "@/Components/InputSwitch";
import PrimaryButton from "@/Components/PrimaryButton";
import Select from "@/Components/Select";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/Admin/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Create({ auth, streams, substreams }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        stream_id: null,
        substream_id: null,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("group.store"));
    };

    const handleStreamChange = (newValue) => {
        setData("stream_id", newValue);
    };
    const handleSubStreamChange = (newValue) => {
        setData("substream_id", newValue);
    };

    const [isEnabled, setIsEnabled] = useState(false);
    const changeGroupType = (newValue) => {
        if (newValue == true) {
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
                <h2 className="font-medium text-lg lg:text-2xl">
                    Group create
                </h2>
            }
        >
            <Head title="Group create" />

            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form className="px-4 py-8" onSubmit={submit}>
                        <div className="mt-3 flex justify-around overflow-clip rounded-lg border bg-gray-100 border-gray-500">
                            <div
                                className={`${
                                    !isEnabled ? "bg-blue-600 text-white" : ""
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

                        <InputLabel htmlFor="name" value="Group name" />
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
                                    disabled={!isEnabled}
                                />
                                <Select
                                    options={substreams}
                                    defaultValue="Виберіть поток групи"
                                    defaultSelectable={false}
                                    disabled={!isEnabled}
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
                                    disabled={isEnabled}
                                />
                                <Select
                                    options={streams}
                                    defaultValue="Виберіть поток"
                                    defaultSelectable={false}
                                    disabled={isEnabled}
                                    value={data.stream_id}
                                    onChange={handleStreamChange}
                                />
                            </>
                        )}
                        <InputError
                            message={errors.stream_id}
                            className="mt-2"
                        />
                        <InputError
                            message={errors.substream_id}
                            className="mt-2"
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
