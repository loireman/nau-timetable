import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/Admin/AdminLayout";
import { Icon } from "@iconify/react";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Dashboard({ auth }) {
    const [group, setGroup] = useState("");
    const [deps, setDeps] = useState([]);
    const [depLoader, setDepLoader] = useState(false);
    const [groupLoader, setGroupLoader] = useState(false);
    const [timetableLoader, setTimetableLoader] = useState(false);

    const parse = async () => {
        try {
            setTimetableLoader(true);
            const response = await axios.post(route("api.parse.timetable"), {
                group: group,
            });

            toast.success("Розклад спизджено");
        } catch (error) {
            toast.error(error.response.data.error);
        } finally {
            setTimetableLoader(false);
        }
    };

    const parseDep = async () => {
        try {
            setDepLoader(true);

            const depNames = await axios.post(route("api.parse.dep"));

            const filteredDeps = depNames.data.filter(
                (item) => !deps.includes(item)
            );
            filteredDeps.forEach(async (item) => {
                const data = {
                    name: item,
                    short: item,
                    chief: "-",
                };
                response = await axios.post(route("department.store"), data);
            });

            toast.success("Факультети спизджено");
        } catch (error) {
            toast.error(error);
            toast.error(error.response.data.error);
        } finally {
            fetchDeps();
            setDepLoader(false);
        }
    };

    const parseGroup = async () => {
        try {
            setGroupLoader(true);

            const depNames = await axios.post(route("api.parse.group"), {
                group: group,
            });

            toast.success("Групу спизджено");
        } catch (error) {
            toast.error(error);
            toast.error(error.response.data.error);
        } finally {
            setGroupLoader(false);
        }
    };

    const fetchDeps = async () => {
        try {
            const response = await axios.get(route("api.fetch.dep"));
            setDeps(response.data);
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    useEffect(() => {
        fetchDeps();
    }, []);

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
                    <div>
                        <div className="p-6">
                            Ультимативний пиздер розкладу нау
                        </div>

                        <div className="admin-list">
                            <div className="card-default">
                                <h2 className="text-lg mb-1">
                                    Кількість факультетів: {deps.length}
                                </h2>
                                <PrimaryButton
                                    disabled={depLoader}
                                    onClick={() => parseDep()}
                                >
                                    {depLoader ? (
                                        <Icon
                                            icon="svg-spinners:bars-scale"
                                            className="w-6 h-6 mx-auto"
                                        />
                                    ) : (
                                        <>Спиздить факультети</>
                                    )}
                                </PrimaryButton>
                            </div>

                            <div className="card-default">
                                <h2 className="text-lg mb-1">
                                    Назва групи,{" "}
                                    <a
                                        href="https://portal.nau.edu.ua/schedule/group/list"
                                        className="text-blue-600 underline"
                                        target="_blank"
                                    >
                                        переглянути тут
                                    </a>
                                </h2>
                                <div className="flex flex-col gap-3 lg:grid lg:grid-cols-3">
                                    <TextInput
                                        className="col-span-1"
                                        name="group"
                                        type="text"
                                        label="Group"
                                        value={group}
                                        onChange={(e) =>
                                            setGroup(e.target.value)
                                        }
                                    />
                                    <PrimaryButton
                                        className="col-span-1"
                                        disabled={groupLoader}
                                        onClick={() => parseGroup()}
                                    >
                                        {groupLoader ? (
                                            <Icon
                                                icon="svg-spinners:bars-scale"
                                                className="w-6 h-6 mx-auto"
                                            />
                                        ) : (
                                            <>Спиздить групу</>
                                        )}
                                    </PrimaryButton>
                                    <PrimaryButton
                                        className="col-span-1"
                                        disabled={timetableLoader}
                                        onClick={() => parse()}
                                    >
                                        {timetableLoader ? (
                                            <Icon
                                                icon="svg-spinners:bars-scale"
                                                className="w-6 h-6 mx-auto"
                                            />
                                        ) : (
                                            <>Спиздить розклад</>
                                        )}
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
