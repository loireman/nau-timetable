import React, { useEffect, useState } from "react";
import InputSwitch from "@/Components/InputSwitch";
import Modal from "./Modal";
import { Icon } from "@iconify/react";
import * as moment from "moment-timezone";

const TimetableDesktop = ({
    currentLesson = 1,
    currentDay = 1,
    currentWeek = 1,
    selectedPGroup,
    timetable,
    weekDefault,
    singleWeek = false,
    isTeacher = false,
}) => {
    const [week, setWeek] = useState(0);
    const [openLesson, setOpenLesson] = useState(false);
    const [elementId, setElementId] = useState(null);

    useEffect(() => {
        setWeek(weekDefault);
    }, [weekDefault]);

    const handleWeekChange = (value) => {
        setWeek(value);
    };

    const lessonStart = (value) => {
        const currentMoment = moment.tz();

        // Set time to 8:00 AM in Kyiv timezone
        const kyivMoment = currentMoment
            .clone()
            .tz("Europe/Kiev")
            .set({ hour: 8, minute: 0, second: 0 });

        // Convert start time to user's timezone
        const userTimezone = moment.tz.guess();
        const userMoment = kyivMoment.clone().tz(userTimezone);

        const startMinutes = userMoment.hours() * 60 + (value - 1) * 110;
        const endMinutes = startMinutes + 95;

        const formatTime = (minutes) => {
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            return hours + ":" + (mins < 10 ? "0" + mins : mins);
        };

        return `${formatTime(startMinutes)} - ${formatTime(endMinutes)}`;
    };

    return (
        <div>
            {!singleWeek && (
                <div className="flex content-center items-center gap-4 justify-center mb-4">
                    <span className="font-medium text-xl">Week 1</span>
                    <InputSwitch
                        initialValue={week}
                        onChange={handleWeekChange}
                    />
                    <span className="font-medium text-xl">Week 2</span>
                </div>
            )}

            <table className="timetable">
                <thead>
                    <tr>
                        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"].map(
                            (day, key) => (
                                <th
                                    className={`${
                                        key + 1 === currentDay &&
                                        week + 1 === currentWeek
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
                                        key + 1 === currentDay &&
                                        week + 1 === currentWeek
                                            ? "day-active"
                                            : ""
                                    }`}
                                    key={day}
                                >
                                    {day === 1 ? (
                                        <div className="time">
                                            {lessonStart(lesson)}
                                        </div>
                                    ) : (
                                        <div className="time inactive"></div>
                                    )}

                                    {timetable.map((entry, index) => (
                                        <div key={index}>
                                            {(isTeacher ||
                                                entry.pgroup === 0 ||
                                                entry.pgroup ==
                                                    selectedPGroup) &&
                                            entry.week === week + 1 &&
                                            entry.day === day &&
                                            entry.lesson === lesson ? (
                                                <div className="card-default relative overflow-hidden lesson">
                                                    <div className="flex flex-wrap gap-2 justify-between">
                                                        <div
                                                            className={`lesson-type type-${entry.type}`}
                                                        >
                                                            {
                                                                [
                                                                    "Лекція",
                                                                    "Практична",
                                                                    "Лабораторна",
                                                                ][entry.type]
                                                            }
                                                        </div>

                                                        {entry.auditory_link ? (
                                                            <a
                                                                className={
                                                                    entry.week ===
                                                                        currentWeek &&
                                                                    entry.day ===
                                                                        currentDay &&
                                                                    entry.lesson ===
                                                                        currentLesson
                                                                        ? `lesson-meet active`
                                                                        : `lesson-meet`
                                                                }
                                                                href={
                                                                    entry.auditory_link
                                                                        ? entry.auditory_link
                                                                        : null
                                                                }
                                                                target="_blank"
                                                            >
                                                                <Icon
                                                                    className="w-4 h-4"
                                                                    icon="logos:google-meet"
                                                                />
                                                            </a>
                                                        ) : (
                                                            <>
                                                                {entry.week ===
                                                                    currentWeek &&
                                                                    entry.day ===
                                                                        currentDay &&
                                                                    entry.lesson ===
                                                                        currentLesson && (
                                                                        <div className="text-red-600 font-semibold flex overflow-visible items-center gap-2">
                                                                            Наразі{" "}
                                                                            <Icon
                                                                                icon="oui:dot"
                                                                                className="w-4 h-4 pulsating-dot"
                                                                            />
                                                                        </div>
                                                                    )}
                                                            </>
                                                        )}
                                                    </div>

                                                    <span className="text-xl font-semibold">
                                                        {entry.name}
                                                    </span>
                                                    {isTeacher == true ? (
                                                        <span className="text-sm font-medium text-gray-400 flex flex-wrap gap-1">
                                                            <span className="flex flex-wrap gap-x-3">
                                                                {entry.groups.map(
                                                                    (
                                                                        group,
                                                                        index
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {
                                                                                group
                                                                            }{" "}
                                                                        </span>
                                                                    )
                                                                )}
                                                            </span>
                                                            {entry.type == 2
                                                                ? ` / ${entry.pgroup}`
                                                                : null}
                                                        </span>
                                                    ) : (
                                                        <>
                                                            {entry.teacher && (
                                                                <div className="flex gap-3 items-center">
                                                                    <Icon
                                                                        className="w-6 h-6"
                                                                        icon="mdi:person"
                                                                    />
                                                                    <span className="text-sm font-medium text-gray-400">
                                                                        {
                                                                            entry.teacher
                                                                        }
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </>
                                                    )}
                                                    {entry.auditory && (
                                                        <div className="flex gap-3 items-center">
                                                            <Icon
                                                                className="w-6 h-6"
                                                                icon="mdi:office-building-marker"
                                                            />
                                                            <span className="text-sm font-medium text-gray-400">
                                                                {entry.auditory}
                                                            </span>
                                                        </div>
                                                    )}
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
    );
};

export default TimetableDesktop;
