import React, { useEffect, useState } from "react";

const TimetableSelect = ({ data, setData }) => {
    const [selectedWeek, setSelectedWeek] = useState(data.week);
    const [selectedDay, setSelectedDay] = useState(data.day);
    const [selectedLesson, setSelectedLesson] = useState(data.lesson);

    useEffect(() => {
        // Update selected week, day, and lesson when data changes
        setSelectedWeek(data.week);
        setSelectedDay(data.day);
        setSelectedLesson(data.lesson);
    }, [data]);

    const handleCellClick = (week, day, lesson) => {
        setSelectedWeek(week);
        setSelectedDay(day);
        setSelectedLesson(lesson);

        // Update the form data with the selected values
        setData({
            ...data,
            week,
            day,
            lesson,
        });
    };

    // Define day labels in Ukrainian
    const dayLabels = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

    const renderTable = () => {
        const weeks = ["Week 1", "Week 2"]; // Adjusted week display
        const days = [0, 1, 2, 3, 4, 5]; // Adjusted to start from Monday (0)
        const lessons = [1, 2, 3, 4, 5, 6];

        return (
            <div className="table-container">
                {weeks.map((week, weekIndex) => (
                    <table key={weekIndex} className="admin-timetable">
                        <thead>
                            <tr>
                                <th>{week}</th>
                                {lessons.map((lesson) => (
                                    <th key={lesson} className="lesson-order">
                                        {lesson}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {days.map((day) => (
                                <tr key={day}>
                                    <th>{dayLabels[day]}</th>
                                    {lessons.map((lesson) => (
                                        <td key={lesson}>
                                            <label
                                                className={`cell-label ${
                                                    weekIndex + 1 ===
                                                        selectedWeek &&
                                                    day + 1 === selectedDay &&
                                                    lesson === selectedLesson
                                                        ? "active"
                                                        : ""
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name={`cell-${
                                                        weekIndex + 1
                                                    }-${day + 1}`}
                                                    checked={
                                                        weekIndex + 1 ===
                                                            selectedWeek &&
                                                        day + 1 === selectedDay &&
                                                        lesson === selectedLesson
                                                    }
                                                    onChange={() =>
                                                        handleCellClick(
                                                            weekIndex + 1,
                                                            day + 1,
                                                            lesson
                                                        )
                                                    }
                                                />
                                            </label>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ))}
            </div>
        );
    };

    return (
        <div className="mt-3">
            {/* Render two separate tables with the same selected ratio */}
            {renderTable()}
        </div>
    );
};

export default TimetableSelect;
