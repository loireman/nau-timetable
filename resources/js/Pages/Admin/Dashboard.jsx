import AuthenticatedLayout from "@/Layouts/Admin/AdminLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-medium text-lg lg:text-2xl">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="">
                        <div className="p-6">
                            You're logged in admin!
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
