import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import Pagination from "@/Components/Pagination";
import { Icon } from "@iconify/react";
import Dropdown from "@/Components/Dropdown";

export default function Index({ auth, tovaries }) {
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
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Товари
                </h2>
            }
        >
            <Head title="Товари" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg mb-3 p-3 grid md:flex md:justify-between gap-3">
                        <div className="w-full md:max-w-md border border-gray-300 rounded-full">
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
                                    class="peer h-full w-full outline-none text-md pr-4 bg-transparent border-0 text-gray-900 dark:text-gray-100"
                                    type="search"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Шукати за назвою.."
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
                                <Dropdown.Link
                                    onClick={() => handleSort("name")}
                                >
                                    Ім'я (від А до Я)
                                </Dropdown.Link>
                                <Dropdown.Link
                                    onClick={() => handleSort("-name")}
                                >
                                    Ім'я (від Я до А)
                                </Dropdown.Link>
                                <Dropdown.Link
                                    onClick={() => handleSort("price")}
                                >
                                    Спочатку найдешевші
                                </Dropdown.Link>
                                <Dropdown.Link
                                    onClick={() => handleSort("-price")}
                                >
                                    Спочатку найдорожчі
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 p-4 overflow-hidden shadow-sm sm:rounded-lg text-gray-900 dark:text-gray-100">
                        {tovaries.data.map((element) => (
                            <div class="group relative">
                                <div class="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 dark:bg-gray-700 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                                        alt="Front of men&#039;s Basic Tee in black."
                                        class="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div class="mt-4 flex justify-between">
                                    <div>
                                        <h3 class="text-xl text-gray-700 dark:text-gray-100">
                                            <a
                                                href={
                                                    "/products/" + element.slug
                                                }
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    class="absolute inset-0"
                                                ></span>
                                                {element.name}
                                            </a>
                                        </h3>
                                        <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
                                            Тип: {element.property1}
                                        </p>
                                    </div>
                                    <div className="grid justify-items-end pr-1">
                                        <p class="text-xl font-medium text-gray-900 dark:text-gray-100">
                                            ${element.price}
                                        </p>
                                        <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
                                            К-сть: {element.property2}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Pagination
                        nameContent="товари"
                        pageContent={tovaries}
                    ></Pagination>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
