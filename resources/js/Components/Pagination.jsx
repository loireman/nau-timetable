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
                            (element.label === "&laquo; Previous") ||
                            (element.label === "Next &raquo;")
                                ? "first-page"
                                : ""
                        }`}
                        href={element.url}
                        key={key}
                    >
                        {(element.label == "&laquo; Previous" && (
                            <div>
                                <Icon icon="mdi:chevron-left" />
                                Previous
                            </div>
                        )) ||
                            (element.label == "Next &raquo;" && (
                                <div>
                                    Next
                                    <Icon icon="mdi:chevron-right" />
                                </div>
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
