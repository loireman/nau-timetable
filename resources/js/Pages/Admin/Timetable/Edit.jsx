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

export default function Edit({ auth, timetable, groups }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: timetable.name,
        teacher: timetable.teacher,
        type: timetable.type,
        week: timetable.week,
        day: timetable.day,
        lesson: timetable.lesson,
        auditory: timetable.auditory,
        pgroup: timetable.pgroup,
        group_id: timetable.group_id,
    });

    const submit = (e) => {
        e.preventDefault();

        Inertia.put(
            route("timetable.update", { timetable: timetable }),
            data
        );
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
                        <InputLabel htmlFor="name" value="Group" />
                        <Select
                            options={groups}
                            defaultValue="Виберіть групу"
                            defaultSelectable={false}
                            value={data.group_id}
                            onChange={handleSelectChange}
                        />

                        {data.group_id != null ? (
                            <>
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

                                <div className="mt-3">
                                    <Radio
                                        label="Лекція"
                                        checked={data.type == 0}
                                        onChange={() => handleTypeChange("0")}
                                    />
                                    <Radio
                                        label="Практична"
                                        checked={data.type == 1}
                                        onChange={() => handleTypeChange("1")}
                                    />
                                    <Radio
                                        label="Лабораторна"
                                        checked={data.type == 2}
                                        onChange={() => handleTypeChange("2")}
                                    />
                                </div>

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
