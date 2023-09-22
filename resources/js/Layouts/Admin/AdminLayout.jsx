import { useEffect, useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import VerticalNavLink from "@/Components/VerticalNavLink";
import { Icon } from "@iconify/react";
import Dropdown from "@/Components/Dropdown";
import SearchInput from "@/Components/SearchInput";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Authenticated({
    header,
    searchField = false,
    addElement = false,
    sortOptions = [],
    children,
    filterOptions = [],
}) {
    const [search, setSearch] = useState("");
    const [selectedFilterState, setSelectedFilterState] = useState([]);
    const [formFilterState, setFormFilterState] = useState([]);

    // Get the values of filters from the query string and initialize selectedFilters
    useEffect(() => {
        const url = new URL(window.location);
        const searchParams = url.searchParams;

        const activeFilters = filterOptions
            .filter((filter) => searchParams.get(filter.key) === "on")
            .map((filter) => filter.key);

        setSelectedFilterState(activeFilters);
        setFormFilterState(activeFilters);
    }, [filterOptions]);

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

    const [openOptions, setOpenOptions] = useState(false);

    const openOptionsModal = (id) => {
        setOpenOptions(true);
    };

    const closeModal = () => {
        setOpenOptions(false);
    };

    const handleFilterToggle = (filter) => {
        if (formFilterState.includes(filter.key)) {
            setFormFilterState(
                formFilterState.filter((item) => item !== filter.key)
            );
        } else {
            setFormFilterState([...formFilterState, filter.key]);
        }
    };

    const handleFilterRemove = (filterKey) => {
        setSelectedFilterState((prevSelectedFilters) =>
            prevSelectedFilters.filter((item) => item !== filterKey)
        );

        // Remove the filter key from the URL
        const url = new URL(window.location);
        url.searchParams.delete(filterKey);
        window.location = url.toString();
    };

    const handleApplyFilters = () => {
        const url = new URL(window.location);

        // Remove all filter keys that are not in formFilterState
        filterOptions.forEach((filter) => {
            if (!formFilterState.includes(filter.key)) {
                url.searchParams.delete(filter.key);
            }
        });

        // Add selected filter keys from formFilterState
        formFilterState.forEach((filterKey) => {
            url.searchParams.set(filterKey, "on");
        });

        window.location = url;
    };


    return (
        <div className="flex min-h-screen">
            <div className="sidebar">
                <a
                    className="grid justify-center w-full p-4 lg:p-6"
                    href={route("admin")}
                >
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
                            Timetable
                        </span>
                        <VerticalNavLink
                            href={route("department.index")}
                            active={route().current(
                                "department.(index|create|edit)"
                            )}
                            icon="mdi:office-building-cog"
                            title="Departments"
                        />
                        <VerticalNavLink
                            href={route("stream.index")}
                            active={route().current(
                                "stream.(index|create|edit)"
                            )}
                            icon="mdi:account-group"
                            title="Streams"
                        />
                        <VerticalNavLink
                            href={route("group.index")}
                            active={route().current(
                                "group.(index|create|edit)"
                            )}
                            icon="mdi:account-group-outline"
                            title="Groups"
                        />
                        <VerticalNavLink
                            href={route("timetable.index")}
                            active={route().current(
                                "timetable.(index|create|edit)"
                            )}
                            icon="mdi:timetable"
                            title="Timetables"
                        />
                    </div>
                    <div className="flex flex-col gap-2 items-center w-full">
                        <span className="py-4 px-1 text-sm lg:text-2xl w-full text-start">
                            User edit
                        </span>
                        <VerticalNavLink
                            href={route("user.index")}
                            active={route().current("user.(index|create|edit)")}
                            icon="mdi:account-multiple"
                            title="Users"
                        />
                        <VerticalNavLink
                            href={route("role.index")}
                            active={route().current("role.(index|create|edit)")}
                            icon="mdi:account-cog"
                            title="Roles"
                        ></VerticalNavLink>
                        <VerticalNavLink
                            href={route("permission.index")}
                            active={route().current(
                                "permission.(index|create|edit)"
                            )}
                            icon="mdi:lock"
                            title="Permissions"
                        ></VerticalNavLink>
                    </div>
                    <div className="flex flex-col gap-2 items-center w-full">
                        <span className="py-4 px-1 text-sm lg:text-2xl w-full text-start">
                            Server
                        </span>
                        <VerticalNavLink
                            href={route("config.index")}
                            active={route().current(
                                "config.(index|create|edit)"
                            )}
                            icon="mdi:settings"
                            title="Configs"
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
                    {filterOptions.length !== 0 && (
                        <>
                            <div className="options-block">
                                <div
                                    className={`chip filter active`}
                                    onClick={() => openOptionsModal()}
                                >
                                    Filters
                                </div>
                                {selectedFilterState.length !== 0 && (
                                    <>
                                        {selectedFilterState.map(
                                            (filterKey, key) => (
                                                <div
                                                    key={key}
                                                    className="chip filter"
                                                >
                                                    {filterKey}
                                                    <Icon
                                                        icon="mdi:close"
                                                        onClick={() =>
                                                            handleFilterRemove(
                                                                filterKey
                                                            )
                                                        }
                                                    />
                                                </div>
                                            )
                                        )}
                                    </>
                                )}
                            </div>
                            <Modal show={openOptions} onClose={closeModal}>
                                <div className="card-modal">
                                    <button
                                        className="fixed right-4"
                                        onClick={closeModal}
                                    >
                                        <Icon icon="mdi:close" />
                                    </button>
                                    <div>
                                        <h5 className="form-text">Filters</h5>
                                    </div>
                                    <div>
                                        {filterOptions.map((element, key) => (
                                            <label
                                                key={key}
                                                className="flex items-center"
                                            >
                                                <input
                                                    type="checkbox"
                                                    name={element.key}
                                                    checked={formFilterState.includes(
                                                        element.key
                                                    )}
                                                    onChange={() =>
                                                        handleFilterToggle(
                                                            element
                                                        )
                                                    }
                                                />
                                                <span className="ml-2 text-sm">
                                                    {element.key}
                                                    {element.value !== null &&
                                                        ` (${element.value})`}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                    <PrimaryButton
                                        className="mt-6 w-full grid"
                                        onClick={handleApplyFilters}
                                    >
                                        <span>Filter</span>
                                    </PrimaryButton>
                                </div>
                            </Modal>
                        </>
                    )}
                    <div className="flex justify-between">
                        {sortOptions.length != 0 && (
                            <Dropdown className="w-fit">
                                <Dropdown.Trigger>
                                    <span className="flex w-fit gap-2 items-center lg:text-2xl">
                                        Sort
                                        <Icon
                                            icon="mdi:sort"
                                            className="md:w-6 md:h-6"
                                        />
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content align="left">
                                    {sortOptions.map((option, key) => (
                                        <Dropdown.Link
                                            key={key}
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
                                <Icon
                                    icon="mdi:plus"
                                    className="md:w-6 md:h-6"
                                />
                                <span className="font-medium md:text-2xl">
                                    Create
                                </span>
                            </a>
                        )}
                    </div>
                </div>
                <main>{children}</main>
            </div>
        </div>
    );
}
