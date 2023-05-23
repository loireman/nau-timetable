import ReactPaginate from "react-paginate";
import { useState } from "react";

export default function Pagination({
    nameContent = "елементи",
    pageContent,
    ...props
}) {
    return (
        <div className="max-w-full p-6 text-gray-900 dark:text-gray-100 font-semibold grid justify-items-center gap-3">
            <div className="flex gap-2 max-w-full">
                {Object.entries(pageContent.links).map(([key, element]) => (
                    <a
                        className={
                            (((element.active &&
                                "grid content-center justify-center w-10 h-10 text-gray-200 bg-green-600 dark:bg-green-900 rounded-full") ||
                                (element.label == "&laquo; Previous" && "<") ||
                                (element.label == "Next &raquo;" && ">")) &&
                                "grid content-center justify-center w-10 h-10 text-grat-200 bg-green-600 dark:bg-green-900 rounded-full") ||
                            "hidden md:grid content-center justify-center w-10 h-10 text-grat-200 bg-gray-400 dark:bg-gray-700 rounded-full"
                        }
                        href={element.url}
                        key={element}
                    >
                        {(element.label == "&laquo; Previous" && "<") ||
                            (element.label == "Next &raquo;" && ">") ||
                            element.label}
                    </a>
                ))}
            </div>
            <p>
                Виводяться {nameContent} {pageContent.from} - {pageContent.to}
            </p>
        </div>
    );
}
