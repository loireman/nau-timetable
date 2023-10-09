// webpack.mix.js
const mix = require("laravel-mix");
const path = require("path");

mix.js("resources/js/app.jsx", "public/js")
    .react()
    .sass("resources/css/app.sass", "public/css")
    .copy("node_modules/react-toastify/dist/ReactToastify.css", "public/css")
    .setPublicPath("public")
    .webpackConfig({
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "resources/js"),
            },
        },
    });
