import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import axios from "axios";
import PrimaryButton from "@/Components/PrimaryButton";
import Select from "@/Components/Select";
import TimetableDesktop from "@/Components/TimetableDesktop";
import TimetableMobile from "@/Components/TimetableMobile";
import SearchExtInput from "@/Components/SearchExtInput";
import InputSwitch from "@/Components/InputSwitch";

export default function Timetable({ auth, group }) {
    const [timetable, setTimetable] = useState([]);

    const [_group, setGroup] = useState(group);
    const [selectedPGroup, setSelectedPGroup] = useState(0);
    const [week, setWeek] = useState(0);
    const [currentWeek, setCurrentWeek] = useState(0);
    const [currentDay, setCurrentDay] = useState(0);
    const [currentLesson, setCurrentLesson] = useState(0);

    async function fetchGroups(group) {
        if (group != "") {
            const response = await axios.get(`/api/v1/group/${group}`);
            if (response.data.data.timetables) {
                setTimetable(response.data.data.timetables);
            }
        }
    }

    const updateCurrentTime = () => {
        var date = new Date(
            new Date().toLocaleString("en", { timeZone: "Europe/Rome" })
        );
        var rawDay = date.getDay();
        var time = date.getHours() * 60 + date.getMinutes();
        var value = 0;

        if (time > 525 && time < 1275) {
            time = time - 525;
            value++;
            while (time > 0) {
                time = time - 110;
                value++;
            }
        }

        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));

        var week1 = new Date(date.getFullYear(), 0, 4);
        var week =
            1 +
            Math.round(
                ((date.getTime() - week1.getTime()) / 86400000 -
                    3 +
                    ((week1.getDay() + 6) % 7)) /
                    7
            );

        week = (week % 2 == (rawDay == 0) ? 1 : 0) + 1;

        setWeek(week - 1);
        setCurrentWeek(week);
        setCurrentDay(rawDay);
        setCurrentLesson(value);
    };

    useEffect(() => {
        fetchGroups(_group);
        updateCurrentTime();
    }, [_group]);

    const handleSearch = (paramValue) => {
        const url = new URL(window.location);
        const paramName = "group";

        setGroup(paramValue);

        if (url.searchParams.has(paramName)) {
            url.searchParams.set(paramName, paramValue);
        } else {
            url.searchParams.append(paramName, paramValue);
        }

        window.history.pushState({}, "", url);

        const urlChangeEvent = new Event("urlchange");
        window.dispatchEvent(urlChangeEvent);
    };

    const handlePGroupChange = (value) => {
        setSelectedPGroup(value);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Timetable" />

            <div className="bg-white">
                <div className="flex justify-center items-center gap-2 lg:gap-6 p-6 text-gray-900 w-full">
                    <div className="max-w-[260px] grid lg:gap-3">
                        <SearchExtInput
                            suggestionsEndpoint="/api/v1/search/group"
                            onSearch={handleSearch}
                            defaultValue={_group}
                            isFocused={false}
                        />
                    </div>
                    <div className="max-w-[260px] content-center grid lg:gap-3">
                        <div className="flex content-center items-center gap-4 justify-center">
                            <span className="font-semibold text-xl">1</span>
                            <InputSwitch
                                initialValue={selectedPGroup}
                                onChange={handlePGroupChange}
                            />
                            <span className="font-semibold text-xl">2</span>
                        </div>
                    </div>
                </div>
                <div className="grid px-6 text-gray-900 w-full gap-12 max-xl:hidden">
                    <TimetableDesktop
                        currentLesson={currentLesson}
                        currentDay={currentDay}
                        currentWeek={currentWeek}
                        selectedPGroup={selectedPGroup + 1}
                        timetable={timetable}
                        weekDefault={week}
                    />
                </div>
                <div className="grid px-6 text-gray-900 w-full gap-12 xl:hidden">
                    <TimetableMobile
                        currentLesson={currentLesson}
                        currentDay={currentDay}
                        currentWeek={currentWeek}
                        selectedPGroup={selectedPGroup + 1}
                        timetable={timetable}
                        weekDefault={week}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
