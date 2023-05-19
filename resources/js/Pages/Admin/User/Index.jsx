import AuthenticatedLayout from "@/Layouts/Admin/AdminLayout";
import { Head } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import Pagination from "@/Components/Pagination";
import { Icon } from "@iconify/react";
import Dropdown from "@/Components/Dropdown";

export default function Index({ auth, users, can }) {
    const [search, setSearch] = useState("");

    const handleClick = () => {
        const url = new URL(window.location);
        url.searchParams.set("search", search);
        window.location = url;
    };

    const handleSort = (sort) => {
        const url = new URL(window.location);
        url.searchParams.set("sort", sort);
        window.location = url;
    }

    function destroy(id) {
        if (confirm("Are you sure you want to delete?")) {
            const csrfToken = document.querySelector(
                'meta[name="csrf-token"]'
            ).content;

            fetch(route("user.destroy", id), {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                },
            }).then(() => {
                window.location.reload();
            });
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Права користувачів
                </h2>
            }
        >
            <Head title="Права користувачів" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg mb-3 p-3 grid md:flex gap-3">
                        {can.create && (
                            <a href={route("user.create")}>
                                <div className="px-4 py-2 rounded-full bg-green-900 hover:bg-green-800 text-white flex gap-1 justify-center md:w-fit">
                                    <Icon icon="mdi:plus" width={24} />
                                    <span className="font-medium text-xl">
                                        Створити
                                    </span>
                                </div>
                            </a>
                        )}
                        <div className="w-full md:max-w-md mx-auto border border-gray-300 rounded-full">
                            <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg overflow-hidden">
                                <button
                                    onClick={handleClick}
                                    class="grid place-items-center h-full w-16 text-gray-900 dark:text-gray-100"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </button>

                                <input
                                    class="peer h-full w-full outline-none text-md pr-2 bg-transparent border-0 text-gray-900 dark:text-gray-100"
                                    type="search"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Шукати за іменем.."
                                />
                            </div>
                        </div>

                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex w-full justify-end rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center text-xl font-semibold py-2 w-full md:w-36 mx-auto border border-gray-300 rounded-full text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                    >
                                        Сортування
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link onClick={() => handleSort("id")}>
                                    Id (за зростанням)
                                </Dropdown.Link>
                                <Dropdown.Link onClick={() => handleSort("-id")}>
                                    Id (за спаданням)
                                </Dropdown.Link>
                                <Dropdown.Link onClick={() => handleSort("name")}>
                                    Ім'я (від А до Я)
                                </Dropdown.Link>
                                <Dropdown.Link onClick={() => handleSort("-name")}>
                                    Ім'я (від Я до А)
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="w-full text-gray-900 dark:text-gray-100">
                            <thead>
                                <td className="p-3 border-b border-gray-300">
                                    ID
                                </td>
                                <td className="p-3 border-b border-gray-300">
                                    Ім'я
                                </td>
                                <td className="p-3 border-b border-gray-300 hidden sm:table-cell">
                                    Пошта
                                </td>
                                {(can.edit || can.delete) && (
                                    <td className="p-3 border-b border-gray-300">
                                        Дії
                                    </td>
                                )}
                            </thead>
                            <tbody>
                                {users.data.map((element) => (
                                    <tr className="p-2" key={element}>
                                        <td className="p-3 border-b border-gray-600">
                                            {element.id}
                                        </td>
                                        <td className="p-3 border-b border-gray-600">
                                            {element.name}
                                        </td>
                                        <td className="p-3 border-b border-gray-600 hidden sm:table-cell">
                                            <a href={"mailto:" + element.email}>
                                                {element.email}
                                            </a>
                                        </td>

                                        <td className="p-3 border-b border-gray-600">
                                            <a
                                                href={route(
                                                    "user.show",
                                                    element.id
                                                )}
                                            >
                                                <div className="px-4 py-2 rounded-full bg-green-900 hover:bg-green-800">
                                                    <Icon
                                                        className="m-auto"
                                                        icon="mdi:eye-outline"
                                                    />
                                                </div>
                                            </a>
                                            {can.edit && (
                                                <a
                                                    className=""
                                                    href={route(
                                                        "user.edit",
                                                        element.id
                                                    )}
                                                >
                                                    <div className="mt-2 px-4 py-2 rounded-full bg-blue-900 hover:bg-blue-800">
                                                        <Icon
                                                            className="m-auto"
                                                            icon="mdi:pencil"
                                                        />
                                                    </div>
                                                </a>
                                            )}
                                            {can.delete && (
                                                <button
                                                    className="mt-2 px-4 py-2 w-full bg-red-900 hover:bg-red-800 rounded-full"
                                                    onClick={() =>
                                                        destroy(element.id)
                                                    }
                                                >
                                                    <Icon
                                                        className="m-auto"
                                                        icon="mdi:trash"
                                                    />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination pageContent={users}></Pagination>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
