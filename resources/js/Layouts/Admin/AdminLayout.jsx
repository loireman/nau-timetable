import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import VerticalNavLink from "@/Components/VerticalNavLink";
import { Icon } from "@iconify/react";

export default function Authenticated({ user, header, children }) {
    const [navigationFull, setNavigationFull] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            {navigationFull ? (
                <div class="flex flex-col items-center w-64 min-h-screen fixed overflow-hidden text-gray-400 bg-gray-900 border-r-2 border-gray-800">
                    <button
                        onClick={() => setNavigationFull(false)}
                        class="flex w-full items-center justify-center mt-3"
                    >
                        <ApplicationLogo
                            width="32"
                            class="fill-gray-400"
                        ></ApplicationLogo>
                        <span class="ml-2 text-sm font-bold">Admin page</span>
                    </button>
                    <div class="w-full px-2">
                        <div class="flex flex-col items-center w-full mt-3 border-t border-gray-700">
                            <VerticalNavLink
                                href={route("admin")}
                                active={route().current("admin")}
                            >
                                <svg
                                    class="w-6 h-6 stroke-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                                <span class="ml-2 text-sm font-medium">
                                    Dasboard
                                </span>
                            </VerticalNavLink>
                            <VerticalNavLink
                                href={route("tovary.index")}
                                active={route().current("tovary.index")}
                            >
                                <svg
                                    class="w-6 h-6 stroke-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <span class="ml-2 text-sm font-medium">
                                    Products
                                </span>
                            </VerticalNavLink>
                        </div>
                        <div class="flex flex-col items-center w-full mt-2 border-t border-gray-700">
                            <VerticalNavLink
                                href={route("user.index")}
                                active={route().current("user.index")}
                            >
                                <svg
                                    class="w-6 h-6 stroke-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                                    />
                                </svg>
                                <span class="ml-2 text-sm font-medium">
                                    Users
                                </span>
                            </VerticalNavLink>
                            <VerticalNavLink
                                href={route("role.index")}
                                active={route().current("role.index")}
                            >
                                <svg
                                    class="w-6 h-6 stroke-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                                    />
                                </svg>
                                <span class="ml-2 text-sm font-medium">
                                    Permissions
                                </span>
                            </VerticalNavLink>
                            <VerticalNavLink
                                href={route("permission.index")}
                                active={route().current("permission.index")}
                            >
                                <svg
                                    class="w-6 h-6 stroke-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                                    />
                                </svg>
                                <span class="ml-2 text-sm font-medium">
                                    Roles
                                </span>
                            </VerticalNavLink>
                        </div>
                    </div>
                    <a
                        class="flex items-center justify-center w-full h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300"
                        href="/dashboard"
                    >
                        <Icon
                            icon="material-symbols:exit-to-app-rounded"
                            fill="none"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        />
                        <span class="ml-2 text-sm font-medium">На головну</span>
                    </a>
                </div>
            ) : (
                <div class="min-h-screen fixed flex flex-col items-center w-16 overflow-hidden text-gray-400 bg-gray-900 border-r-2 border-gray-800">
                    <button
                        onClick={() => setNavigationFull(true)}
                        class="flex items-center justify-center mt-3"
                    >
                        <ApplicationLogo
                            width="32"
                            class="fill-gray-400"
                        ></ApplicationLogo>
                    </button>
                    <div class="flex flex-col items-center mt-3 border-t border-gray-700">
                        <VerticalNavLink
                            href={route("admin")}
                            active={route().current("admin")}
                        >
                            <svg
                                class="w-6 h-6 stroke-current"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                        </VerticalNavLink>
                        <VerticalNavLink
                            href={route("tovary.index")}
                            active={route().current("tovary.index")}
                        >
                            <svg
                                class="w-6 h-6 stroke-current"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </VerticalNavLink>
                    </div>
                    <div class="flex flex-col items-center mt-2 border-t border-gray-700">
                        <VerticalNavLink
                            href={route("user.index")}
                            active={route().current("user.index")}
                        >
                            <svg
                                class="w-6 h-6 stroke-current"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                                />
                            </svg>
                        </VerticalNavLink>
                        <VerticalNavLink
                            href={route("role.index")}
                            active={route().current("role.index")}
                        >
                            <svg
                                class="w-6 h-6 stroke-current"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                                />
                            </svg>
                        </VerticalNavLink>
                        <VerticalNavLink
                            href={route("permission.index")}
                            active={route().current("permission.index")}
                        >
                            <svg
                                class="w-6 h-6 stroke-current"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                                />
                            </svg>
                        </VerticalNavLink>
                    </div>
                    <a
                        class="flex items-center justify-center w-16 h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300"
                        href="/dashboard"
                    >
                        <Icon
                            icon="material-symbols:exit-to-app-rounded"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        />
                    </a>
                </div>
            )}
            <div className={navigationFull ? "w-full pl-64" : "w-full pl-16"}>
                {header && (
                    <header className="bg-white dark:bg-gray-800 shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                <main>{children}</main>
            </div>
        </div>
    );
}
