import AuthenticatedLayout from "@/Layouts/Admin/AdminLayout";
import { Head } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import Pagination from "@/Components/Pagination";
import { Icon } from "@iconify/react";

export default function Dashboard({ auth, permissions, can }) {
    console.log(permissions);

    function destroy(id) {
        if (confirm("Are you sure you want to delete?")) {
            const csrfToken = document.querySelector(
                'meta[name="csrf-token"]'
            ).content;

            fetch(route("permission.destroy", id), {
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
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="w-full text-gray-900 dark:text-gray-100">
                            <thead>
                                <td className="p-3 border-b border-gray-300">
                                    ID
                                </td>
                                <td className="p-3 border-b border-gray-300">
                                    Name
                                </td>
                                {(can.edit || can.delete) && (
                                    <td className="p-3 border-b border-gray-300">
                                        Actions
                                    </td>
                                )}
                            </thead>
                            <tbody>
                                {permissions.data.map((element) => (
                                    <tr className="p-2" key={element}>
                                        <td className="p-3 border-b border-gray-600">
                                            {element.id}
                                        </td>
                                        <td className="p-3 border-b border-gray-600">
                                            {element.name}
                                        </td>
                                        {(can.edit || can.delete) && (
                                            <td className="p-3 border-b border-gray-600">
                                                {can.edit && (
                                                    <a
                                                        href={route(
                                                            "permission.edit",
                                                            element.id
                                                        )}
                                                    >
                                                        <div className="px-4 py-2 w-fit rounded-full bg-blue-900" >

                                                            <Icon icon="mdi:pencil" />
                                                        </div>
                                                    </a>
                                                )}
                                                {can.delete && (
                                                    <button
                                                        className="mt-2 px-4 py-2 bg-red-800 rounded-full"
                                                        onClick={() =>
                                                            destroy(element.id)
                                                        }
                                                    >
                                                        <Icon icon="mdi:trash" />
                                                    </button>
                                                )}
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination pageContent={permissions}></Pagination>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
