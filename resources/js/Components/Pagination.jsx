import { Icon } from "@iconify/react";

export default function Pagination({
  nameContent = "елементи",
  pageContent,
  ...props
}) {
  const isMobile = window.innerWidth <= 1024; // Adjust the breakpoint as needed
  const limit = isMobile ? 5 : 10;

  // Separate "Previous" and "Next" links
  const previousLink = pageContent.links.find(
    (element) => element.label === "&laquo; Previous"
  );
  const nextLink = pageContent.links.find(
    (element) => element.label === "Next &raquo;"
  );

  // Filter out "Previous" and "Next" links from the visible links
  const visibleLinks = pageContent.links.filter(
    (element) =>
      element.label !== "&laquo; Previous" &&
      element.label !== "Next &raquo;"
  );

  // Always show 5 links on mobile, and 10 on desktop, with first and last fixed
  const currentPage = parseInt(pageContent.current_page, 10);

  let startIndex;
  let endIndex;

  if (pageContent.last_page <= limit) {
    // If the total count is less than the limit, show all links
    startIndex = 1;
    endIndex = pageContent.last_page;
  } else {
    if (currentPage <= Math.floor(limit / 2) + 1) {
      startIndex = 1;
    } else if (currentPage >= pageContent.last_page - Math.floor(limit / 2)) {
      startIndex = pageContent.last_page - limit + 1;
    } else {
      startIndex = currentPage - Math.floor(limit / 2);
    }

    endIndex = Math.min(startIndex + limit - 1, pageContent.last_page);
  }

  const limitedLinks = visibleLinks.slice(startIndex - 1, endIndex);

  return (
    <div className="pagination">
      <div className="content">
        <a className="first-page" href={previousLink.url}>
          <Icon icon="mdi:chevron-left" />
        </a>
        {limitedLinks.map((element, index) => (
          <a
            className={`${element.active ? "active" : ""}`}
            href={element.url}
            key={index}
          >
            {element.label !== "&laquo; Previous" &&
              element.label !== "Next &raquo;" &&
              element.label}
          </a>
        ))}
        <a className="first-page" href={nextLink.url}>
          <Icon icon="mdi:chevron-right" />
        </a>
      </div>
      <p>
        Виводяться {nameContent} {pageContent.from} - {pageContent.to}
      </p>
    </div>
  );
}
