import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import VerticalNavLink from "@/Components/VerticalNavLink";
import { Icon } from "@iconify/react";

export default function Authenticated({ user, header, children }) {
    const [navigationFull, setNavigationFull] = useState(false);

    return (
        <div className="flex min-h-screen">
            {navigationFull ? (
                <div class="sidebar open">
                    <button onClick={() => setNavigationFull(false)} className="mt-3">
                        <ApplicationLogo text></ApplicationLogo>
                    </button>
                    <div class="w-full px-2">
                        <div class="flex flex-col gap-2 items-center w-full mt-3">
                            <span className="p-4 w-full text-start">
                                Main elements
                            </span>
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
                                    Dashboard
                                </span>
                            </VerticalNavLink>
                        </div>
                        <div class="flex flex-col items-center w-full mt-2">
                        <span className="p-4 w-full text-start">
                                User edit
                            </span>
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
                <div class="sidebar">
                    <button onClick={() => setNavigationFull(true)} className="mt-3">
                        <ApplicationLogo></ApplicationLogo>
                    </button>
                    <div class="flex flex-col gap-2 items-center mt-3">
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
                    </div>
                    <div class="flex flex-col gap-2 items-center mt-2">
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
                    <header className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                    </header>
                )}
                <main>{children}</main>
            </div>
        </div>
    );
}
