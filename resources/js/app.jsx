import "./bootstrap";
import "../css/app.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { createRoot } from "react-dom/client";
import { InertiaApp } from "@inertiajs/inertia-react";
import { createInertiaApp } from "@inertiajs/inertia-react";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx");
        const pageComponent = resolvePageComponent(name, pages);
        return pageComponent.default || pageComponent;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <App {...props} />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                />
            </>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
