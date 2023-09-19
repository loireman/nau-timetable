import { Icon } from "@iconify/react";

export default function Pagination({
    nameContent = "елементи",
    pageContent,
    ...props
}) {
    return (
        <div className="pagination">
            <div className="content">
                {Object.entries(pageContent.links).map(([key, element]) => (
                    <a
                        className={`${element.active ? "active" : ""} ${
                            element.label === "&laquo; Previous" ||
                            element.label === "Next &raquo;"
                                ? "first-page"
                                : ""
                        }`}
                        href={element.url}
                        key={key}
                    >
                        {(element.label == "&laquo; Previous" && (
                            <Icon icon="mdi:chevron-left" />
                        )) ||
                            (element.label == "Next &raquo;" && (
                                <Icon icon="mdi:chevron-right" />
                            )) ||
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
