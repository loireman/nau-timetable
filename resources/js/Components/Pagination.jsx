import ReactPaginate from "react-paginate";
import { useState } from "react";

export default function Pagination({ nameContent="елементи", pageContent, ...props }) {
    return (
        <div className="p-6 text-gray-900 dark:text-gray-100 font-semibold grid justify-items-center gap-3">
            <div className="flex gap-2">
                {pageContent.links.map((element) => (
                    <a
                    className={
                            element.active
                                ? "grid content-center justify-center w-10 h-10 bg-green-900 rounded-full"
                                : "grid content-center justify-center w-10 h-10 bg-gray-700 rounded-full"
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
