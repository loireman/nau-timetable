import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/Admin/AdminLayout";
import { Head, useForm } from "@inertiajs/react";

export default function CreateTovary({ auth }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    price: "",
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("tovary.store"), {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Створення товару
        </h2>
      }
    >
      <Head title="Створення товару" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-4 text-gray-300">
            <span className="text-xl font-semibold">Створити товар</span>
            <form className="px-4 py-8" onSubmit={submit}>
              <InputLabel htmlFor="name" value="Назва" />
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

              <InputLabel htmlFor="price" value="Ціна" />
              <TextInput
                id="price"
                name="price"
                type="number"
                value={data.price}
                className="mt-1 block w-full"
                autoComplete="off"
                isFocused={false}
                onChange={(e) => setData("price", e.target.value)}
                required
              />
              <InputError message={errors.price} className="mt-2" />

              <PrimaryButton className="mt-16 w-full grid" disabled={processing}>
                <span className="text-[1rem]">Створити</span>
              </PrimaryButton>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
