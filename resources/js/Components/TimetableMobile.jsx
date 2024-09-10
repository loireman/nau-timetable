import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { Icon } from "@iconify/react";
import * as moment from "moment-timezone";

const DaySelector = ({ selectedDay, onSelectDay }) => {
    const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

    return (
        <div className="day-selector">
            {days.map((day, index) => (
                <span
                    key={index}
                    className={`font-semibold ${
                        selectedDay === index + 1 ? "day-active" : ""
                    }`}
                    onClick={() => onSelectDay(index + 1)}
                >
                    {day}
                </span>
            ))}
        </div>
    );
};

const WeekSelector = ({ selectedWeek, onSelectWeek }) => {
    return (
        <div className="week-selector">
            <span
                className={`font-semibold ${
                    selectedWeek === 0 ? "week-active" : ""
                }`}
                onClick={() => onSelectWeek(0)}
            >
                Тиждень 1
            </span>
            <span
                className={`font-semibold ${
                    selectedWeek === 1 ? "week-active" : ""
                }`}
                onClick={() => onSelectWeek(1)}
            >
                Тиждень 2
            </span>
        </div>
    );
};

const TimetableMobile = ({
    currentLesson = 1,
    currentDay = 1,
    currentWeek = 1,
    selectedPGroup,
    timetable,
    weekDefault,
    singleWeek = false,
    isTeacher = false,
}) => {
    const [week, setWeek] = useState(weekDefault);
    const [selectedDay, setSelectedDay] = useState(currentDay);
    const [openLesson, setOpenLesson] = useState(false);
    const [elementId, setElementId] = useState(null);

    useEffect(() => {
        setWeek(weekDefault);
        setSelectedDay(currentDay);
    }, [weekDefault, currentDay]);

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

    const selectDay = (day) => {
        setSelectedDay(day);
    };

    return (
        <div className="timetable-container">
            <table className="timetable">
                <thead>
                    <tr>
                        <th
                            className={`text-xl ${
                                currentDay === selectedDay &&
                                week + 1 === currentWeek
                                    ? "day-active"
                                    : ""
                            }`}
                        >
                            {
                                [
                                    "Понеділок",
                                    "Вівторок",
                                    "Середа",
                                    "Четвер",
                                    "П'ятниця",
                                    "Субота",
                                ][selectedDay - 1]
                            }
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {[1, 2, 3, 4, 5, 6, 7].map((lesson) => (
                        <tr key={lesson}>
                            <td
                                className={`${
                                    selectedDay === currentDay &&
                                    week + 1 === currentWeek
                                        ? "day-active"
                                        : ""
                                }`}
                            >
                                <div className="time">
                                    <span>{lessonStart(lesson)}</span>
                                </div>
                                {timetable.map((entry, index) => (
                                    <div key={index}>
                                        {(isTeacher ||
                                            entry.pgroup === 0 ||
                                            entry.pgroup == selectedPGroup) &&
                                        entry.week === week + 1 &&
                                        entry.day === selectedDay &&
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

                                                    {entry.auditory_link && (
                                                        <a
                                                        className={(entry.week === currentWeek &&
                                                            entry.day === currentDay &&
                                                            entry.lesson === currentLesson) ? `lesson-meet active` : `lesson-meet`}
                                                            href={
                                                                entry.auditory_link
                                                                    ? entry.auditory_link
                                                                    : null
                                                            }
                                                            target="_blank"
                                                        >
                                                            <Icon
                                                                className="w-6 h-6"
                                                                icon="logos:google-meet"
                                                            />
                                                        </a>
                                                    )}
                                                </div>

                                                <span className="text-xl font-semibold">
                                                    {entry.name}
                                                </span>
                                                {isTeacher == true ? (
                                                    <span className="text-sm font-medium text-gray-400">
                                                        {entry.group}
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
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="selectors-bottom">
                {!singleWeek && (
                    <>
                        <WeekSelector
                            selectedWeek={week}
                            onSelectWeek={handleWeekChange}
                        />
                        <div className="vertical-line"></div>
                    </>
                )}
                <DaySelector
                    selectedDay={selectedDay}
                    onSelectDay={selectDay}
                />
            </div>
        </div>
    );
};

export default TimetableMobile;
