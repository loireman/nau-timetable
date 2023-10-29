import React, { useEffect, useState } from "react";
import InputSwitch from "@/Components/InputSwitch";

const TimetableDesktop = ({
    currentLesson = 1,
    currentDay = 1,
    currentWeek = 1,
    selectedPGroup,
    timetable,
    weekDefault,
    isTeacher = false,
}) => {
    const [week, setWeek] = useState(0);
    useEffect(() => {
        setWeek(weekDefault);
    }, [weekDefault]);
    const handleWeekChange = (value) => {
        setWeek(value);
    };
    const lessonStart = (value) => {
        const currentOffset = new Date().getTimezoneOffset();
        const startMinutes = 300 + (value - 1) * 110 - currentOffset;
        const endMinutes = startMinutes + 95;

        const formatTime = (minutes) => {
            var hours = Math.floor(minutes / 60);
            var minutes = minutes % 60;
            return hours + ":" + (minutes < 10 ? "0" + minutes : minutes);
        };

        return `${formatTime(startMinutes)} - ${formatTime(endMinutes)}`;
    };
    return (
        <div>
            <div className="flex content-center items-center gap-4 justify-center mb-4">
                <span className="font-medium text-xl">Week 1</span>
                <InputSwitch initialValue={week} onChange={handleWeekChange} />
                <span className="font-medium text-xl">Week 2</span>
            </div>

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
                                        <div className="time inactive">
                                        </div>
                                    )}

                                    {timetable.map((entry, index) => (
                                        <div key={index}>
                                            {(isTeacher || (entry.pgroup === 0 ||
                                                entry.pgroup ==
                                                    selectedPGroup)) &&
                                            entry.week === week + 1 &&
                                            entry.day === day &&
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
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TimetableDesktop;
