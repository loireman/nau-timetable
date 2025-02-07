import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/Admin/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Dashboard({ auth }) {
    const [groupID, setGroupID] = useState("");
    const [timetable, setTimetable] = useState([]);

    const submit = async (e, item) => {
        e.preventDefault();

        try {
            response = await axios.post(route("timetable.store"), item);
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.success("Предмет додано (хз)");
            }
        }
    };

    const parse = async () => {
        try {
            const response = await axios.post("/api/v1/parse", {
                groupID: groupID,
            });

            setTimetable(response.data);
            toast.success("Розклад спизджено");
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-medium text-lg lg:text-2xl">Dashboard</h2>
            }
        >
            <Head title="Dashboard" />

            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div >
                        <div className="p-6">
                            Ультимативний пиздер розкладу нау
                        </div>

                        <div className="admin-list">
                            <div className="card-default">
                                <h2 className="text-lg mb-1">
                                    Ід групи, дивитись{" "}
                                    <a
                                        href="https://portal.nau.edu.ua/schedule/group/list"
                                        className="text-blue-600 underline"
                                        target="_blank"
                                    >
                                        тут
                                    </a>
                                </h2>
                                <div className="flex flex-col gap-3 lg:grid lg:grid-cols-3">
                                    <TextInput
                                        className="col-span-1"
                                        name="groupID"
                                        type="number"
                                        label="Group"
                                        value={groupID}
                                        onChange={(e) =>
                                            setGroupID(e.target.value)
                                        }
                                    />
                                    <PrimaryButton
                                        className="col-span-2"
                                        onClick={() => parse()}
                                    >
                                        Спиздить розклад
                                    </PrimaryButton>
                                </div>
                            </div>
                            {timetable && (
                                <div >
                                    <h2 className="text-lg font-semibold p-4">
                                        Розклад {timetable.group}
                                    </h2>
                                    <div className="whitespace-pre-wrap">
                                        {timetable.lessons?.map(
                                            (item, index) => (
                                                <div
                                                    key={index}
                                                    className="card-default flex flex-col lg:flex-row lg:justify-between lg:items-center my-4"
                                                >
                                                    <div >
                                                        <p className="font-medium">
                                                            {item.week} тиждень,{" "}
                                                            {
                                                                [
                                                                    "Понеділок",
                                                                    "Вівторок",
                                                                    "Середа",
                                                                    "Четвер",
                                                                    "П'ятниця",
                                                                    "Субота",
                                                                ][item.day - 1]
                                                            }
                                                            {", "}
                                                            {item.lesson} пара
                                                        </p>
                                                        <p className="text-lg font-semibold">
                                                            {item.name}
                                                        </p>
                                                        <p >
                                                            {
                                                                [
                                                                    "Лекція",
                                                                    "Практичне",
                                                                    "Лабораторна",
                                                                ][item.type]
                                                            }
                                                            {item.pgroup !==
                                                                0 && (
                                                                <span>
                                                                    {
                                                                        " - Підгрупа "
                                                                    }
                                                                    {
                                                                        item.pgroup
                                                                    }
                                                                </span>
                                                            )}
                                                        </p>
                                                        <p>
                                                            {item.teacher}
                                                        </p>
                                                        <p className="text-sm">
                                                            {item.room}
                                                        </p>
                                                    </div>
                                                    <div >
                                                        <PrimaryButton
                                                        className="w-full"
                                                            onClick={(e) =>
                                                                submit(e, item)
                                                            }
                                                        >
                                                            Додати
                                                        </PrimaryButton>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
