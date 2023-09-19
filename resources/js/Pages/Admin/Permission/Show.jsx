import AuthenticatedLayout from "@/Layouts/Admin/AdminLayout";
import { Head } from "@inertiajs/react";

export default function Show({ auth, permission }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Перегляд права доступу
        </h2>
      }
    >
      <Head title="Перегляд права доступу" />

      <div className="py-12">
      <div className="max-w-5xl ml-20 sm:px-9s lg:px-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg pt-4 pb-8">
            <span className="p-6 text-gray-900 dark:text-gray-100 font-bold text-3xl">Назва ролі: {permission.name}</span>
            <div className="mt-4">
              <span className="text-lg font-semibold ml-6 dark:text-gray-100">ID: {permission.id}</span>
            </div>
            {/* Додаткові відомості про право доступу */}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
