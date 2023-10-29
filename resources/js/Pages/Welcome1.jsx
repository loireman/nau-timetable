import PrimaryButton from "@/Components/PrimaryButton";
import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center selection:bg-red-500 selection:text-white">
                <div className="sm:fixed sm:top-0 sm:left-0 sm:flex items-center space-x-4 p-6 ml-14">
                    {auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="font-bold text-black hover:text-red-500"
                        >
                            Розклад
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="font-bold text-black hover:text-red-500"
                            >
                                Логін
                            </Link>
                            <Link
                                href={route("register")}
                                className="font-bold text-black hover:text-red-500"
                            >
                                Реєстрація
                            </Link>
                        </>
                    )}
                </div>
                <div className="welcome-layout">
                    <div className="welcome-container">
                        <h1>Вас вітає ROZKLAD NAU</h1>
                        <span>
                            Сайт "ROZKLAD NAU" надає можливість створювати та
                            переглядати розклад занять. Головна функція сайту
                            полягає в тому, щоб користувачі могли вводити
                            інформацію про розклад університетських занять,
                            вказуючи дні тижня, час проведення, групи,
                            викладачів і предмети. Потім користувачі можуть
                            переглядати цей розклад, долучати до нього свої
                            групи, отримувати сповіщення про зміни в розкладі та
                            багато іншого. Сайт допомагає студентам, викладачам
                            і адміністрації навчальних закладів легко та зручно
                            організовувати свій навчальний процес.
                        </span>
                        <div>
                            <a href={route("dashboard")}>
                                <PrimaryButton>
                                    Розклад <br />
                                    студента
                                </PrimaryButton>
                            </a>
                            <a href={route("teacher")}>
                                <PrimaryButton className="bg-red-600 hover:bg-red-800">
                                    Розклад <br />
                                    викладача
                                </PrimaryButton>
                            </a>
                        </div>
                    </div>
                    <img src="storage/img/febb655.png" />
                </div>
            </div>
        </>
    );
}
