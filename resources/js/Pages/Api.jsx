import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <AuthenticatedLayout user={auth.user} header={<>Api розкладу</>}>
            <Head title="Api" />
            <div className="pt-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid gap-6">
                    {[
                        {
                            type: "GET",
                            link: "api.teacher.find",
                            link_data: null,
                            description:
                                "відображення всіх викладачів які збережені на сайті",
                        },
                        {
                            type: "GET",
                            link: "api.teacher.find",
                            link_data: "{name}",
                            description:
                                "відображення всіх викладачів за вказаним іменем",
                        },
                        {
                            type: "GET",
                            link: "api.group.find",
                            link_data: null,
                            description:
                                "відображення всіх груп які збережені на сайті",
                        },
                        {
                            type: "GET",
                            link: "api.group.find",
                            link_data: "{name}",
                            description:
                                "відображення всіх груп за вказаною назвою",
                        },
                        {
                            type: "GET",
                            link: "api.teacher.get",
                            link_data: "{teacher}",
                            description:
                                "відображення розкладу за вказаним іменем викладача",
                        },
                        {
                            type: "GET",
                            link: "api.group.get",
                            link_data: "{group}",
                            description:
                                "відображення розкладу за вказаною назвою групи",
                        },
                    ].map((element, index) => (
                        <div className="card-default">
                            <code>
                                <span className="px-2 py-1 bg-red-500 rounded-lg text-white font-medium">
                                    {element.type}
                                </span>{" "}
                                <a
                                    className="text-blue-600 hover:text-blue-700"
                                    href={route(
                                        element.link,
                                        element.link_data ?? null
                                    )}
                                >
                                    {route(element.link, "")}
                                    {element.link_data
                                        ? `/${element.link_data}`
                                        : null}
                                </a>
                            </code>
                            <p>
                                - {element.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
