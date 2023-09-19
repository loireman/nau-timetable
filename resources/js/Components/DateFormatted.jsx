import React from "react";

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}

function DateFormatted({ inputDate, className }) {
    const formattedDate = formatDate(inputDate);

    return <>{formattedDate}</>;
}

export default DateFormatted;
