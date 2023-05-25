import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/Admin/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Edit({ auth, user, roles }) {
  const { data, setData, put, processing, errors, reset } = useForm({
    name: user.name,
    email: user.email,
    roles: user.roles.map((role) => role.id),
    password: '',
    password_confirmation: '',
  });

  const handleCheckers = (event) => {
    const value = parseInt(event.target.value);
    if (event.target.checked) {
      setData((prevItems) => ({
        ...prevItems,
        roles: [...prevItems.roles, value],
      }));
    } else {
      setData((prevItems) => ({
        ...prevItems,
        roles: prevItems.roles.filter((item) => item !== value),
      }));
    }
  };

  const submit = (e) => {
    e.preventDefault();

    Inertia.put(route("user.update", { user: user }), data);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Редагування користувача
        </h2>
      }
    >
      <Head title="Редагування користувача" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-4 text-gray-800 dark:text-gray-300">
            <span className="text-xl font-semibold">
              Редагувати користувача
            </span>
            <form className="px-4 py-8" onSubmit={submit}>
              <InputLabel htmlFor="name" value="Ім'я" />
              <TextInput
                id="name"
                name="name"
                value={data.name}
                className="mt-1 block w-full"
                autoComplete="name"
                isFocused={true}
                onChange={(e) => setData("name", e.target.value)}
                required
              />
              <InputError message={errors.name} className="mt-2" />
              <InputLabel htmlFor="email" value="Пошта" />
              <TextInput
                id="email"
                name="email"
                value={data.email}
                className="mt-1 block w-full"
                autoComplete="email"
                isFocused={true}
                onChange={(e) => setData("email", e.target.value)}
                required
              />
              <InputError message={errors.email} className="mt-2" />
              <InputLabel htmlFor="password" value="Пароль" />
              <TextInput
                id="password"
                name="password"
                value={data.password}
                type="password"
                className="mt-1 block w-full"
                autoComplete="new-password"
                isFocused={true}
                onChange={(e) => setData("password", e.target.value)}
                required
              />
              <InputError message={errors.password} className="mt-2" />
              <InputLabel htmlFor="password_confirmation" value="Підтвердіть пароль" />
              <TextInput
                id="password_confirmation"
                name="password_confirmation"
                value={data.password_confirmation}
                type="password"
                className="mt-1 block w-full"
                autoComplete="new-password"
                isFocused={true}
                onChange={(e) => setData("password_confirmation", e.target.value)}
                required
              />
              <InputError message={errors.password_confirmation} className="mt-2" />
              <div className="block mt-4">
                {Object.entries(roles).map(([key, value]) => (
                  <label className="flex items-center" key={key}>
                    <Checkbox
                      name={value}
                      value={key}
                      checked={data.roles.includes(parseInt(key))}
                      onChange={handleCheckers}
                    />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      {value}
                    </span>
                  </label>
                ))}
              </div>

              <PrimaryButton onClick={submit} disabled={processing} className="mt-8">
                Зберегти
              </PrimaryButton>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
