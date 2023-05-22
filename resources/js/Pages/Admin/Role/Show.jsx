import AuthenticatedLayout from '@/Layouts/Admin/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Show({ auth, role, roleHasPermissions }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Інформація про роль</h2>}
    >
      <Head title="Інформація про роль" />

      <div className="py-12">
        <div className="max-w-5xl ml-20 sm:px-9s lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg pb-8">
            <div className="p-6 text-gray-900 dark:text-gray-100 font-bold text-3xl">Назва ролі: {role.name}</div>

            <div className="ml-8 dark:text-gray-100">
              <h3 className="mt-4 text-xl font-medium text-center">Дозволи для ролі</h3>
              <div className="mt-10 grid grid-cols-3 gap-3">
                {roleHasPermissions.map((permission) => (
                  <div key={permission.id}>{permission}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
