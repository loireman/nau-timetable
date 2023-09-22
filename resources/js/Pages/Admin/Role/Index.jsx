import AuthenticatedLayout from "@/Layouts/Admin/AdminLayout";
import { Head } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import Pagination from "@/Components/Pagination";
import { Icon } from "@iconify/react";
import DateFormatted from "@/Components/DateFormatted";
import Modal from "@/Components/Modal";
import { toast } from "react-toastify";

export default function Index({ auth, roles, can, message, error }) {
    function destroy(id) {
        if (confirm("Are you sure you want to delete?")) {
            const csrfToken = document.querySelector(
                'meta[name="csrf-token"]'
            ).content;

            fetch(route("role.destroy", id), {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                },
            }).then(() => {
                window.location.reload();
            });
        }
    }

    const [openOptions, setOpenOptions] = useState(false);
    const [elementId, setElementId] = useState(null);

    const openOptionsModal = (id) => {
        setOpenOptions(true);
        setElementId(id);
    };

    const closeModal = () => {
        setOpenOptions(false);
    };

    useEffect(() => {
        if (message) {
            toast.success(message);
        }
        if (error) {
            toast.error(error);
        }
    }, [message, error]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-medium text-lg lg:text-2xl">
                    Ролі користувачів
                </h2>
            }
            addElement={can.create}
            searchField
            sortOptions={[
                { key: "id", label: "Id (Ascending)" },
                { key: "-id", label: "Id (Descending)" },
                { key: "name", label: "Name (A to Z)" },
                { key: "-name", label: "Name (Z to A)" },
            ]}
        >
            <Head title="Ролі користувачів" />

            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="admin-list">
                        {roles.data.map((element, index) => (
                            <div
                                className="card-default flex"
                                onClick={() => openOptionsModal(index)}
                                key={index}
                            >
                                <div>
                                    <h5 className="form-text">
                                        {element.name}
                                    </h5>
                                    <span>
                                        Updated at{" "}
                                        <DateFormatted
                                            inputDate={element.updated_at}
                                        />
                                    </span>
                                </div>
                                <div className="hidden lg:block flex-1">
                                    {element.permissions.length == 0 ? (
                                        <div className="options-block">
                                            <div className="chip">No data</div>
                                        </div>
                                    ) : (
                                        <div className="options-block">
                                            {element.permissions.map(
                                                (element) => (
                                                    <div className="chip">
                                                        {element.name}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <Modal show={openOptions} onClose={closeModal}>
                        {roles.data[elementId] && (
                            <div className="card-modal">
                                <button
                                    className="fixed right-4 outline-0"
                                    onClick={closeModal}
                                >
                                    <Icon icon="mdi:close" />
                                </button>
                                <div>
                                    <span className="form-label">Name</span>
                                    <h5 className="form-text">
                                        {roles.data[elementId]?.name}
                                    </h5>
                                </div>
                                <div>
                                    <span className="form-label">
                                        Permissions
                                    </span>

                                    {roles.data[elementId]?.permissions
                                        .length == 0 ? (
                                        <div className="options-block">
                                            <div className="chip">No data</div>
                                        </div>
                                    ) : (
                                        <div className="options-block">
                                            {roles.data[
                                                elementId
                                            ]?.permissions.map((element) => (
                                                <div className="chip">
                                                    {element.name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="grid gap-1 m-auto">
                                    <span>
                                        Created at{" "}
                                        <DateFormatted
                                            inputDate={
                                                roles.data[elementId]
                                                    ?.created_at
                                            }
                                        />
                                    </span>
                                    <span>
                                        Updated at{" "}
                                        <DateFormatted
                                            inputDate={
                                                roles.data[elementId]
                                                    ?.updated_at
                                            }
                                        />
                                    </span>
                                </div>
                                {can.edit && (
                                    <a
                                        className="admin-edit"
                                        href={route(
                                            "role.edit",
                                            roles.data[elementId].id
                                        )}
                                    >
                                        Edit <Icon icon="mdi:pencil" />
                                    </a>
                                )}
                                {can.delete && (
                                    <button
                                        className="admin-delete"
                                        onClick={() =>
                                            destroy(roles.data[elementId].id)
                                        }
                                    >
                                        Delete
                                        <Icon icon="mdi:trash" />
                                    </button>
                                )}
                            </div>
                        )}
                    </Modal>
                    {/* <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="w-full text-gray-900 dark:text-gray-100">
                            <thead>
                                <td className="p-3 border-b border-gray-300">
                                    ID
                                </td>
                                <td className="p-3 border-b border-gray-300">
                                    Назва
                                </td>
                                {(can.edit || can.delete) && (
                                    <td className="p-3 border-b border-gray-300">
                                        Дії
                                    </td>
                                )}
                            </thead>
                            <tbody>
                                {roles.data.map((element) => (
                                    <tr className="p-2" key={element}>
                                        <td className="p-3 border-b border-gray-600">
                                            {element.id}
                                        </td>
                                        <td className="p-3 border-b border-gray-600">
                                            {element.name}
                                        </td>

                                        <td className="p-3 border-b border-gray-600 text-white">
                                            <a
                                                href={route(
                                                    "role.show",
                                                    element.id
                                                )}
                                            >
                                                <div className="px-4 py-2 rounded-full bg-green-600 dark:bg-green-900 hover:bg-green-500 dark:hover:bg-green-800">
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
                                                        "role.edit",
                                                        element.id
                                                    )}
                                                >
                                                    <div className="mt-2 px-4 py-2 rounded-full bg-blue-600 dark:bg-blue-900 hover:bg-blue-500 dark:hover:bg-blue-800">
                                                        <Icon
                                                            className="m-auto"
                                                            icon="mdi:pencil"
                                                        />
                                                    </div>
                                                </a>
                                            )}
                                            {can.delete && (
                                                <button
                                                    className="mt-2 px-4 py-2 w-full bg-red-600 dark:bg-red-900 hover:bg-red-500 dark:hover:bg-red-800 rounded-full"
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
                    </div> */}
                    <Pagination pageContent={roles}></Pagination>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
