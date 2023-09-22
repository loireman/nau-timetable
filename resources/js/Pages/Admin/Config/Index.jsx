import AuthenticatedLayout from "@/Layouts/Admin/AdminLayout";
import { Head } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import Pagination from "@/Components/Pagination";
import { Icon } from "@iconify/react";
import DateFormatted from "@/Components/DateFormatted";
import Modal from "@/Components/Modal";
import { toast } from "react-toastify";

export default function Index({ auth, configs, can, message, error }) {
    function destroy(id) {
        if (confirm("Are you sure you want to delete?")) {
            const csrfToken = document.querySelector(
                'meta[name="csrf-token"]'
            ).content;

            fetch(route("config.destroy", id), {
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
            header={<h2 className="font-medium text-lg lg:text-2xl">Configs</h2>}
            addElement={can.create}
            searchField
            sortOptions={[
                { key: "id", label: "Id (Ascending)" },
                { key: "-id", label: "Id (Descending)" },
                { key: "name", label: "Name (A to Z)" },
                { key: "-name", label: "Name (Z to A)" },
            ]}
        >
            <Head title="Configs" />

            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="admin-list">
                        {configs.data.map((element, index) => (
                            <div
                                className="card-default"
                                onClick={() => openOptionsModal(index)}
                                key={index}
                            >
                                <h5 className="form-text">{element.name}</h5>
                                <span>
                                    Updated at{" "}
                                    <DateFormatted
                                        inputDate={element.updated_at}
                                    />
                                </span>
                            </div>
                        ))}
                    </div>
                    <Modal show={openOptions} onClose={closeModal}>
                        {configs.data[elementId] && (
                            <div className="card-modal">
                                <button className="fixed right-4" onClick={closeModal}>
                                    <Icon icon="mdi:close" />
                                </button>
                                <div>
                                    <span className="form-label">Name</span>
                                    <h5 className="form-text">{configs.data[elementId]?.name}</h5>
                                </div>
                                <div className="grid gap-1 m-auto">
                                    <span>
                                        Created at{" "}
                                        <DateFormatted
                                            inputDate={
                                                configs.data[elementId]
                                                    ?.created_at
                                            }
                                        />
                                    </span>
                                    <span>
                                        Updated at{" "}
                                        <DateFormatted
                                            inputDate={
                                                configs.data[elementId]
                                                    ?.updated_at
                                            }
                                        />
                                    </span>
                                </div>
                                {can.edit && (
                                    <a
                                        className="admin-edit"
                                        href={route(
                                            "config.edit",
                                            configs.data[elementId].id
                                        )}
                                    >
                                        Edit <Icon icon="mdi:pencil" />
                                    </a>
                                )}
                                {can.delete && (
                                    <button
                                        className="admin-delete"
                                        onClick={() => destroy(configs.data[elementId].id)}
                                    >
                                        Delete
                                        <Icon
                                            icon="mdi:trash"
                                        />
                                    </button>
                                )}
                            </div>
                        )}
                    </Modal>
                    <Pagination pageContent={configs}></Pagination>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
