import AuthenticatedLayout from "@/Layouts/Admin/AdminLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-medium text-lg lg:text-2xl">Dashboard</h2>}
            addElement={can.create}
            searchField
            sortOptions={[
                { key: "id", label: "Id (Ascending)" },
                { key: "-id", label: "Id (Descending)" },
                { key: "name", label: "Name (A to Z)" },
                { key: "-name", label: "Name (Z to A)" },
            ]}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You're logged in admin!
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
