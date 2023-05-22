import AuthenticatedLayout from "@/Layouts/Admin/AdminLayout";
import { Head } from "@inertiajs/react";

export default function Show({ auth, user, userHasRoles }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Інформація про користувача
        </h2>
      }
    >
      <Head title="Інформація про користувача" />

      <div className="py-12">
        <div className="max-w-5xl ml-20 sm:px-9s lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg pb-8 text-gray-900 dark:text-gray-100">
            <div className="p-6 font-bold text-xl">
              Ім'я: {user.name}
            </div>

            <div className="dark:text-gray-100">
              <h3 className="ml-5 text-xl font-medium">Email: {user.email}</h3>
              <div className="ml-5 dark:text-gray-100">
              <h3 className="mt-4 text-xl font-medium">Ролі для користувача:</h3>

                {userHasRoles.map((role) => (
                  <div className="text-xl font-medium" key={role.id}>{role}</div>
                ))}
              </div>
            </div>
            </div>
          </div>
        </div>

    </AuthenticatedLayout>
  );
}
