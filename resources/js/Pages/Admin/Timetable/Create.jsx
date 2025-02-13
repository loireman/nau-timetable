import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Radio from "@/Components/Radio";
import Select from "@/Components/Select";
import TextInput from "@/Components/TextInput";
import TimetableSelect from "@/Components/TimetableSelect";
import AuthenticatedLayout from "@/Layouts/Admin/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function Create({ auth, groups }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        teacher: "",
        type: 0,
        week: 1,
        day: 1,
        lesson: 1,
        auditory: "",
        auditory_link: "",
        pgroup: 0,
        group_id: null,
        group_ids: [],
    });
    const submit = (e) => {
        e.preventDefault();

        post(route("timetable.store"));
    };

    const handleTypeChange = (newValue) => {
        setData("type", newValue);
    };

    const handleSelectChange = (newValue) => {
        if (data.type == 0) {
            setData({
                ...data,
                group_id: newValue,
            });
        }
    };

    const addGroup = (e) => {
        e.preventDefault();
        if (!data.group_id) return;
        if (data.group_ids.some((item) => item == data.group_id)) return;

        setData({
            ...data,
            group_ids: [...data.group_ids, data.group_id],
            group_id: null,
        });
    };

    const removeGroup = (groupValue) => {
        setData({
            ...data,
            group_ids: data.group_ids.filter((item) => item !== groupValue),
        });
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
                    Lesson create
                </h2>
            }
        >
            <Head title="Lesson create" />

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
                        <>
                            <InputLabel htmlFor="name" value="Група" />
                            <div className="flex gap-3">
                                <Select
                                    options={groups}
                                    defaultValue="Додати групу"
                                    defaultSelectable={false}
                                    value={data.group_id}
                                    onChange={handleSelectChange}
                                />
                                <PrimaryButton onClick={(e) => addGroup(e)}>
                                    Додати групу
                                </PrimaryButton>
                            </div>
                            {data.group_ids.length > 0 && (
                                <div className="mt-4">
                                    <InputLabel value="Додані групи" />
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {data.group_ids.map((group) => (
                                            <div
                                                key={group}
                                                className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg"
                                            >
                                                <span>{groups[group]}</span>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeGroup(group)
                                                    }
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                        )
                        {(data.type == 0 && data.group_ids.length != 0) ||
                        (data.type == 2 && data.group_id != null) ? (
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
                                    message={errors.auditory_link}
                                    className="mt-2"
                                />
                                <InputLabel
                                    className="mt-3"
                                    htmlFor="auditory_link"
                                    value="Auditory Google Maps(Meet) link"
                                />
                                <TextInput
                                    id="auditory_link"
                                    name="auditory_link"
                                    value={data.auditory_link}
                                    className="mt-1 block w-full"
                                    autoComplete="auditory_link"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("auditory_link", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.auditory_link}
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
                                    <span className="text-[1rem]">Create</span>
                                </PrimaryButton>
                            </>
                        ) : null}
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
