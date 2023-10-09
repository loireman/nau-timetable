import "./bootstrap";
import "../css/app.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { createRoot } from "react-dom/client";
import { InertiaApp } from "@inertiajs/inertia-react";
import { createInertiaApp } from "@inertiajs/inertia-react";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

const pageContext = require.context("./Pages", true, /\.jsx$/);

const resolvePageComponent = (name) => {
    const pageModule = pageContext(`./${name}.jsx`);
    return pageModule.default || pageModule;
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(name),
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
