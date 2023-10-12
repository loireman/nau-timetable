import { useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Видалити обліковий запис
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Після видалення вашого облікового запису всі його ресурси та
                    дані будуть видалені назавжди. Перш ніж видалити обліковий
                    запис, будь ласка, завантажте всі дані або інформацію, яку
                    ви хочете зберегти.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                Видалити обліковий запис
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Ви впевнені, що хочете видалити свій обліковий запис?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Після видалення вашого облікового запису всі його
                        ресурси та дані будуть безповоротно видалені. Будь
                        ласка, введіть свій пароль, щоб підтвердити, що ви
                        хочете назавжди видалити свій обліковий запис.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Відмінити
                        </SecondaryButton>

                        <DangerButton className="ml-3" disabled={processing}>
                            Видалити обліковий запис
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
