import { useEffect, useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import VerticalNavLink from "@/Components/VerticalNavLink";
import { Icon } from "@iconify/react";
import Dropdown from "@/Components/Dropdown";
import SearchInput from "@/Components/SearchInput";

export default function Authenticated({
    header,
    searchField = false,
    addElement = false,
    sortOptions = [],
    children,
}) {
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        const url = new URL(window.location);
        url.searchParams.set("search", search);
        window.location = url;
    };

    const handleSort = (sort) => {
        const url = new URL(window.location);
        url.searchParams.set("sort", sort);
        window.location = url;
    };

    return (
        <div className="flex min-h-screen">
            <div className="sidebar">
                <a className="grid justify-center w-full p-4 lg:p-6" href={route("admin")}>
                    <ApplicationLogo text></ApplicationLogo>
                </a>

                <div className="w-full py-2 px-1 lg:px-4 overflow-y-scroll">
                    <div className="flex flex-col gap-2 items-center w-full">
                        <span className="py-4 px-1 text-sm lg:text-2xl w-full text-start">
                            Main
                        </span>
                        <VerticalNavLink
                            href={route("admin")}
                            active={route().current("admin")}
                            icon="mdi:home-analytics"
                            title="Dashboard"
                        />
                    </div>
                    <div className="flex flex-col gap-2 items-center w-full">
                        <span className="py-4 px-1 text-sm lg:text-2xl w-full text-start">
                            User edit
                        </span>
                        <VerticalNavLink
                            href={route("user.index")}
                            active={route().current("user.index")}
                            icon="mdi:account-multiple"
                            title="Users"
                        />
                        <VerticalNavLink
                            href={route("role.index")}
                            active={route().current("role.index")}
                            icon="mdi:account-cog"
                            title="Roles"
                        ></VerticalNavLink>
                        <VerticalNavLink
                            href={route("permission.index")}
                            active={route().current("permission.index")}
                            icon="mdi:lock"
                            title="Permissions"
                        ></VerticalNavLink>
                    </div>
                </div>
                <VerticalNavLink
                className="mt-4"
                    href={route("dashboard")}
                    icon="mdi:exit-to-app"
                    title="To the main"
                />
            </div>
            <div className="w-full pl-20 lg:pl-[10rem]">
                <div className="admin-header max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {header && <header>{header}</header>}
                    {searchField && (
                        <form onSubmit={handleSearch}>
                            <SearchInput
                                className="w-full"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                            />
                        </form>
                    )}
                    <div className="flex justify-between">
                        {sortOptions.length != 0 && (
                            <Dropdown className="w-fit">
                                <Dropdown.Trigger>
                                    <span className="flex w-fit gap-2 items-center lg:text-2xl">
                                        Sort
                                        <Icon icon="mdi:sort" className="md:w-6 md:h-6"/>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content align="left">
                                    {sortOptions.map((option) => (
                                        <Dropdown.Link
                                            key={option.key}
                                            onClick={() =>
                                                handleSort(option.key)
                                            }
                                        >
                                            {option.label}
                                        </Dropdown.Link>
                                    ))}
                                </Dropdown.Content>
                            </Dropdown>
                        )}
                        {addElement && (
                            <a
                                href={route(route().current()) + "/create"}
                                className="admin-create"
                            >
                                <Icon icon="mdi:plus" className="md:w-6 md:h-6" />
                                <span className="font-medium md:text-2xl">Create</span>
                            </a>
                        )}
                    </div>
                </div>
                <main>{children}</main>
            </div>
        </div>
    );
}
