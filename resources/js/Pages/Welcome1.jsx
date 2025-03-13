import PrimaryButton from "@/Components/PrimaryButton";
import { Icon } from "@iconify/react";
import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center selection:bg-red-500 selection:text-white">
                <div className="sm:fixed sm:top-0 sm:left-0 sm:flex items-center p-4">
                    {auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="font-bold text-black hover:text-red-500 space-x-4 "
                        >
                            Розклад
                        </Link>
                    ) : (
                        <>
                            {/* <Link
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
                            </Link> */}
                            
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
                        <div>
                        <a
                                target="_blank"
                                href="https://github.com/loireman/nau-timetable"
                                className="inline-flex justify-center items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none transition ease-in-out duration-150"
                            >
                                <Icon
                                    icon="mdi:github"
                                    className="h-5 w-5 mr-2"
                                />
                                GitHub Repo
                            </a>
                            <a
                                target="_blank"
                                href={route("docs.api")}
                                className="inline-flex justify-center ml-3 items-center px-4 py-2 bg-gray-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none transition ease-in-out duration-150"
                            >
                                <Icon
                                    icon="mdi:file-document"
                                    className="h-5 w-5 mr-2"
                                />
                                API Docs
                            </a>
                        </div>
                    </div>
                    <img src="storage/img/febb655.png" />
                </div>
            </div>
        </>
    );
}
