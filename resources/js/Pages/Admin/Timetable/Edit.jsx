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
import Radio from "@/Components/Radio";
import TimetableSelect from "@/Components/TimetableSelect";

export default function Edit({ auth, timetable, groups, streams }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: timetable.name,
        teacher: timetable.teacher,
        type: timetable.type,
        week: timetable.week,
        day: timetable.day,
        lesson: timetable.lesson,
        auditory: timetable.auditory,
        pgroup: timetable.pgroup,
        group_id: timetable.type != 0 ? timetable.group_id : null,
        stream_id: timetable.type == 0 ? timetable.group_id : null,
    });

    const submit = (e) => {
        e.preventDefault();

        Inertia.put(route("timetable.update", { timetable: timetable }), data);
    };

    const handleStreamSelectChange = (newValue) => {
        setData("stream_id", newValue);
    };

    const handleSelectChange = (newValue) => {
        setData("group_id", newValue);
    };

    const handleTypeChange = (newValue) => {
        setData("type", newValue);
    };

    useEffect(() => {
        if (data.type == 2) {
            setData("pgroup", 1);
        } else {
            setData("pgroup", 0);
        }
    }, [data.type]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-medium text-lg lg:text-2xl">
                    Timetable edit
                </h2>
            }
        >
            <Head title="Timetable edit" />

            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form className="px-4 py-8" onSubmit={submit}>
                        <div className="mt-3 flex justify-around overflow-clip rounded-lg border bg-gray-100 border-gray-500">
                            <div
                                className={`${
                                    data.type == 0
                                        ? "bg-blue-600 text-white"
                                        : ""
                                } w-1/3 p-3 text-center font-semibold rounded-md max-md:truncate overflow-hidden`}
                                onClick={() => handleTypeChange("0")}
                            >
                                Лекція
                            </div>
                            <div
                                className={`${
                                    data.type == 1
                                        ? "bg-blue-600 text-white"
                                        : ""
                                } w-1/3 p-3 text-center font-semibold rounded-md max-md:truncate overflow-hidden`}
                                onClick={() => handleTypeChange("1")}
                            >
                                Практична
                            </div>
                            <div
                                className={`${
                                    data.type == 2
                                        ? "bg-blue-600 text-white"
                                        : ""
                                } w-1/3 p-3 text-center font-semibold rounded-md max-md:truncate overflow-hidden`}
                                onClick={() => handleTypeChange("2")}
                            >
                                Лабораторна
                            </div>
                        </div>
                        {data.type == 0 ? (
                            <>
                                <InputLabel htmlFor="name" value="Stream" />
                                <Select
                                    options={streams}
                                    defaultValue="Виберіть поток"
                                    defaultSelectable={false}
                                    value={data.stream_id}
                                    onChange={handleStreamSelectChange}
                                />
                            </>
                        ) : (
                            <>
                                <InputLabel htmlFor="name" value="Group" />
                                <Select
                                    options={groups}
                                    defaultValue="Виберіть групу"
                                    defaultSelectable={false}
                                    value={data.group_id}
                                    onChange={handleSelectChange}
                                />
                            </>
                        )}

                        {(data.type == 0 && data.stream_id != null) ||
                        (data.type != 0 && data.group_id != null) ? (
                            <>
                                {data.type == 2 ? (
                                    <>
                                        <InputLabel
                                            className="mt-3"
                                            htmlFor="pgroup"
                                            value="Підгрупа"
                                        />
                                        <TextInput
                                            id="pgroup"
                                            name="pgroup"
                                            type="number"
                                            min="1"
                                            max="4"
                                            value={data.pgroup}
                                            className="mt-1 block w-full"
                                            autoComplete="pgroup"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "pgroup",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    </>
                                ) : null}
                                <InputLabel
                                    htmlFor="name"
                                    value="Lesson name"
                                    required
                                />
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
                                <InputLabel
                                    className="mt-3"
                                    htmlFor="teacher"
                                    value="Teacher"
                                />
                                <TextInput
                                    id="teacher"
                                    name="teacher"
                                    value={data.teacher}
                                    className="mt-1 block w-full"
                                    autoComplete="teacher"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("teacher", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.teacher}
                                    className="mt-2"
                                />
                                <InputLabel
                                    className="mt-3"
                                    htmlFor="auditory"
                                    value="Auditory"
                                />
                                <TextInput
                                    id="auditory"
                                    name="auditory"
                                    value={data.auditory}
                                    className="mt-1 block w-full"
                                    autoComplete="auditory"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("auditory", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.auditory}
                                    className="mt-2"
                                />

                                <TimetableSelect
                                    data={data}
                                    setData={setData}
                                />
                                <InputError
                                    message={errors.lesson}
                                    className="mt-2"
                                />

                                <PrimaryButton
                                    className="w-full grid mt-6"
                                    disabled={processing}
                                >
                                    <span className="text-[1rem]">Update</span>
                                </PrimaryButton>
                            </>
                        ) : null}
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
