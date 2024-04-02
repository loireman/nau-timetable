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
        const currentMoment = moment.tz("Europe/Rome");
        const isDST = currentMoment.isDST();

        // Set time to 8:00 AM in Kyiv timezone
        const kyivMoment = currentMoment
            .clone()
            .tz("Europe/Kiev")
            .set({ hour: 8, minute: 0, second: 0 });

        let currentOffset = currentMoment.utcOffset();
        if (isDST) {
            currentOffset -= 60; // Adjust for DST
        }

        const startMinutes =
            kyivMoment.hours() * 60 - currentOffset + (value - 1) * 110;
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

    const openLessonModal = (id) => {
        setOpenLesson(true);
        setElementId(id);
    };

    const closeModal = () => {
        setOpenLesson(false);
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
                                            <div
                                                className="card-default relative overflow-hidden lesson"
                                                onClick={() =>
                                                    openLessonModal(index)
                                                }
                                            >
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
            <Modal show={openLesson} onClose={closeModal}>
                {timetable[elementId] && (
                    <div className="card-modal">
                        <button className="fixed right-4" onClick={closeModal}>
                            <Icon icon="mdi:close" />
                        </button>
                        <div>
                            <h5 className="form-text font-semibold">
                                {timetable[elementId]?.name}
                            </h5>
                        </div>
                        <div>
                            <span className="form-label">Тип</span>
                            <h5 className="form-text">
                                {["Лекція", "Практична", "Лабораторна"].map(
                                    (value, key) => (
                                        <div key={key}>
                                            {key == timetable[elementId]?.type
                                                ? value
                                                : null}
                                        </div>
                                    )
                                )}
                            </h5>
                        </div>
                        {isTeacher == true ? (
                            <>
                                <div>
                                    <span className="form-label">Група</span>
                                    <h5 className="form-text">
                                        {timetable[elementId]?.group}
                                    </h5>
                                </div>
                                {timetable[elementId]?.type == 2 ? (
                                    <div>
                                        <span className="form-label">
                                            Підрупа
                                        </span>
                                        <h5 className="form-text">
                                            {timetable[elementId]?.pgroup}
                                        </h5>
                                    </div>
                                ) : null}
                            </>
                        ) : (
                            <div>
                                <span className="form-label">Викладач</span>
                                <h5 className="form-text">
                                    {timetable[elementId]?.teacher ?? (
                                        <small>Не визначений/а</small>
                                    )}
                                </h5>
                            </div>
                        )}
                        <div>
                            <span className="form-label">Аудиторія</span>
                            <h5 className="form-text">
                                {timetable[elementId]?.auditory ?? (
                                    <small>Не визначена</small>
                                )}
                            </h5>
                        </div>
                    </div>
                )}
            </Modal>

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
