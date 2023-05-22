import AuthenticatedLayout from "@/Layouts/Admin/AdminLayout";
import { Head } from "@inertiajs/react";

export default function Show({ auth, tovaries }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Інформація про товар
                </h2>
            }
        >
            <Head title="Інформація про товар" />

            <div className="py-12">
                <div className="max-w-5xl ml-20 sm:px-9s lg:px-8">
                    <div className="grid bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg pb-8 text-gray-900 dark:text-gray-100">
                        <div className="p-6 font-bold text-2xl">
                            Назва : {tovaries.name}
                        </div>
                        <span className="ml-5 text-xl font-medium">
                            Посилання:
                            <a className="text-gray-200" href={"/products/" + tovaries.slug}>
                                {' ' + tovaries.slug}
                            </a>
                        </span>
                        <span className="ml-5 text-xl font-medium">
                            Ціна: {tovaries.price}
                        </span>
                        <span className="ml-5 text-xl font-medium">
                            Властивість 1: {tovaries.property1}
                        </span>
                        <span className="ml-5 text-xl font-medium">
                            Властивість 2: {tovaries.property2}
                        </span>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
