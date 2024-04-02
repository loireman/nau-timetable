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
        const kyivMoment = currentMoment.clone().tz('Europe/Kiev').set({ hour: 8, minute: 0, second: 0 });

        // Convert start time to user's timezone
        const userTimezone = moment.tz.guess();
        const userMoment = kyivMoment.clone().tz(userTimezone);

        const startMinutes =
            userMoment.hours() * 60 + (value - 1) * 110;
        const endMinutes = startMinutes + 95;

        const formatTime = (minutes) => {
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            return hours + ":" + (mins < 10 ? "0" + mins : mins);
        };

        return `${formatTime(startMinutes)} - ${formatTime(endMinutes)}`;
    };

    const openLessonModal = (id) => {
        setOpenLesson(true);
        setElementId(id);
    };

    const closeModal = () => {
        setOpenLesson(false);
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
                            ))}
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
        </div>
    );
};

export default TimetableDesktop;
