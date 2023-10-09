import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import axios from "axios";
import PrimaryButton from "@/Components/PrimaryButton";
import Select from "@/Components/Select";
import InputSwitch from "@/Components/InputSwitch";

export default function Timetable({ auth, department, stream, group, pgroup }) {
    const [timetable, setTimetable] = useState([]);

    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(department);
    const [streams, setStreams] = useState([]);
    const [selectedStream, setSelectedStream] = useState(stream);
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(group);
    const [selectedPGroup, setSelectedPGroup] = useState(pgroup);
    const [week, setWeek] = useState(0);
    const [currentWeek, setCurrentWeek] = useState(0);
    const [currentDay, setCurrentDay] = useState(0);
    const [currentLesson, setCurrentLesson] = useState(0);

    async function fetchDepartments() {
        const response = await axios.get("/api/v1/departments");
        setDepartments(response.data.data);
    }

    async function fetchStreams(departmentId) {
        const response = await axios.get(`/api/v1/streams/${departmentId}`);
        setStreams(response.data.data);
    }

    async function fetchGroups(streamId, groupId = null) {
        const response = await axios.get(
            `/api/v1/groups/${streamId}` +
                (groupId != null ? `/${groupId}` : ``)
        );
        if (response.data.data.groups) {
            setGroups(response.data.data.groups);
        }
        if (response.data.data.timetables) {
            setTimetable(response.data.data.timetables);
        }
    }

    const updateCurrentTime = () => {
        var date = new Date(new Date().toLocaleString('en', {timeZone: 'Europe/Rome'}));
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
        fetchDepartments();
        fetchStreams(stream);
        fetchGroups(stream);
        fetchGroups(stream, group);
        updateCurrentTime(); // Call the function to update current time when component mounts
    }, [stream, group]);

    const handleDepartmentChange = (value) => {
        setSelectedDepartment(value);
        fetchStreams(value);
        setSelectedStream(0);
        setSelectedGroup(0);
        setSelectedPGroup(0);
    };

    const handleStreamChange = (value) => {
        setSelectedStream(value);
        fetchGroups(value);
        setSelectedGroup(0);
        setSelectedPGroup(0);
    };

    const handleGroupChange = (value) => {
        setSelectedGroup(value);
        fetchGroups(selectedStream, value);
        setSelectedPGroup(0);
    };

    const handlePGroupChange = (value) => {
        setSelectedPGroup(value);
    };

    const handleWeekChange = (value) => {
        setWeek(value);
    };

    const lessonStart = (value) => {
        var currentOffset = new Date().getTimezoneOffset();

        var convertedMinutes = 540 + (value - 1) * 110 + currentOffset;

        var hours = Math.floor(convertedMinutes / 60);
        var minutes = convertedMinutes % 60;
        return hours + ":" + (minutes == 0 ? "00" : minutes);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Timetable" />

            <div className="bg-white">
                <div className="flex flex-wrap gap-6 p-6 text-gray-900 w-full">
                    <div className="min-w-[190px] grid gap-3">
                        <span className="font-bold text-xl">Факультет</span>
                        <Select
                            options={departments}
                            defaultValue="Виберіть факультет"
                            defaultSelectable={false}
                            value={selectedDepartment}
                            onChange={handleDepartmentChange}
                        />
                    </div>
                    <div className="min-w-[190px] grid gap-3">
                        <span className="font-bold text-xl">Поток</span>
                        {selectedDepartment != 0 ? (
                            <Select
                                options={streams}
                                defaultValue="Виберіть поток"
                                defaultSelectable={false}
                                value={selectedStream}
                                onChange={handleStreamChange}
                            />
                        ) : null}
                    </div>
                    <div className="min-w-[190px] grid gap-3">
                        <span className="font-bold text-xl">Група</span>
                        {selectedStream != 0 ? (
                            <Select
                                options={groups}
                                defaultValue="Виберіть групу"
                                defaultSelectable={false}
                                value={selectedGroup}
                                onChange={handleGroupChange}
                            />
                        ) : null}
                    </div>
                    <div className="min-w-[190px] grid gap-3">
                        <span className="font-bold text-xl">Підгрупа</span>
                        {selectedGroup != 0 ? (
                            <Select
                                options={["Без підгруп", "Перша", "Друга"]}
                                defaultValue="Без підгруп"
                                defaultSelectable={false}
                                value={selectedPGroup}
                                onChange={handlePGroupChange}
                            />
                        ) : null}
                    </div>
                </div>
                <div className="grid px-6 text-gray-900 w-full gap-12 max-xl:hidden">
                    <div className="flex content-center items-center gap-4 justify-center">
                        <span className="font-semibold text-xl">Week 1</span>
                        <InputSwitch
                            initialValue={week}
                            onChange={handleWeekChange}
                        />
                        <span className="font-semibold text-xl">Week 2</span>
                    </div>
                    <table className="timetable">
                        <thead>
                            <tr>
                                {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"].map(
                                    (day, key) => (
                                        <th
                                            className={`${
                                                key + 1 == currentDay && week + 1 == currentWeek
                                                    ? "day-active"
                                                    : ""
                                            }`}
                                            key={key}
                                        >
                                            {day}
                                        </th>
                                    )
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4, 5, 6, 7].map((lesson) => (
                                <tr key={lesson}>
                                    {[1, 2, 3, 4, 5, 6].map((day, key) => (
                                        <td
                                            className={`${
                                                key + 1 == currentDay && week + 1 == currentWeek
                                                    ? "day-active"
                                                    : ""
                                            }`}
                                            key={day}
                                        >
                                            <div className="time">
                                                {lessonStart(lesson)}
                                            </div>
                                            {timetable.map((entry, index) => (
                                                <div key={index}>
                                                    {(entry.pgroup == 0 ||
                                                        entry.pgroup ==
                                                            selectedPGroup) &&
                                                    entry.week == week + 1 &&
                                                    entry.day == day &&
                                                    entry.lesson == lesson ? (
                                                        <div className="card-default relative overflow-hidden lesson">
                                                            <div
                                                                className={`lesson-type type-${
                                                                    entry.type
                                                                } ${
                                                                    entry.week ==
                                                                        currentWeek &&
                                                                    entry.day ==
                                                                        currentDay &&
                                                                    entry.lesson ==
                                                                        currentLesson
                                                                        ? "active"
                                                                        : ""
                                                                }`}
                                                            ></div>
                                                            <span className="text-xl font-semibold">{entry.name}</span>
                                                        </div>
                                                    ) : null}
                                                </div>
                                            ))}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
