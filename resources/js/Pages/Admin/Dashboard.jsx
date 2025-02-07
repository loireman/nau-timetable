import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/Admin/AdminLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Dashboard({ auth }) {
    const [groupID, setGroupID] = useState("");
    const [timetable, setTimetable] = useState([]);

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
                    <div className="">
                        <div className="p-6">
                            Ультимативний пиздер розкладу нау
                        </div>

                        <div className="p-6 bg-gray-300 rounded-lg shadow">
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
                            <TextInput
                                name="groupID"
                                type="number"
                                label="Group"
                                value={groupID}
                                onChange={(e) => setGroupID(e.target.value)}
                            />
                            <PrimaryButton
                                className="ml-3"
                                onClick={() => parse()}
                            >
                                Спиздить розклад
                            </PrimaryButton>
                            {timetable && (
                                <div>
                                    <h2 className="text-lg font-semibold p-4">
                                        Розклад {timetable.group}
                                    </h2>
                                    <div className="whitespace-pre-wrap">
                                        {timetable.lessons?.map(
                                            (item, index) => (
                                                <div
                                                    key={index}
                                                    className="p-3 rounded-lg bg-gray-200 my-2 flex flex-col lg:flex-row justify-between items-center"
                                                >
                                                    <div className="">
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
                                                        <p className="">
                                                            {
                                                                [
                                                                    "Лекція",
                                                                    "Практичне",
                                                                    "Лабораторна",
                                                                ][item.type]
                                                            }
                                                            {item.pgroup !==
                                                                0 && (
                                                                <span className="text-sm">
                                                                    {
                                                                        " - Підгрупа: "
                                                                    }
                                                                    {
                                                                        item.pgroup
                                                                    }
                                                                </span>
                                                            )}
                                                        </p>
                                                        <p className="">
                                                            {item.teacher}
                                                        </p>
                                                        <p className="text-sm">
                                                            {item.room}
                                                        </p>
                                                        
                                                    </div>
                                                    <div className="">
                                                        <PrimaryButton>Додати</PrimaryButton>
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
