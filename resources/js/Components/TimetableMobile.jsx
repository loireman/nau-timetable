import React, { useEffect, useState } from "react";

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
}) => {
    const [week, setWeek] = useState(weekDefault);
    const [selectedDay, setSelectedDay] = useState(currentDay);

    useEffect(() => {
        setWeek(weekDefault);
        setSelectedDay(currentDay);
    }, [weekDefault, currentDay]);

    const handleWeekChange = (value) => {
        setWeek(value);
    };

    const lessonStart = (value) => {
        const currentOffset = new Date().getTimezoneOffset();
        const startMinutes = 300 + (value - 1) * 110 - currentOffset;
        const endMinutes = startMinutes + 155; // 155 minutes for 2 hours and 35 minutes

        const formatTime = (minutes) => {
            var hours = Math.floor(minutes / 60);
            var minutes = minutes % 60;
            return hours + ":" + (minutes < 10 ? minutes + "0" : minutes);
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
                                        {(entry.pgroup === 0 ||
                                            entry.pgroup === selectedPGroup) &&
                                        entry.week === week + 1 &&
                                        entry.day === selectedDay &&
                                        entry.lesson === lesson ? (
                                            <div className="card-default relative overflow-hidden lesson">
                                                <div
                                                    className={`lesson-type type-${
                                                        entry.type
                                                    } ${
                                                        entry.week ===
                                                            currentWeek &&
                                                        entry.day ===
                                                            currentDay &&
                                                        entry.lesson ===
                                                            currentLesson
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                ></div>
                                                <span className="text-xl font-semibold">
                                                    {entry.name}
                                                </span>
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
                <WeekSelector
                    selectedWeek={week}
                    onSelectWeek={handleWeekChange}
                />
                <div className="vertical-line"></div>
                <DaySelector
                    selectedDay={selectedDay}
                    onSelectDay={selectDay}
                />
            </div>
        </div>
    );
};

export default TimetableMobile;
