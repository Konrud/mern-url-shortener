const path = require("path");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    devtool: "eval-source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new Dotenv({
            path: path.resolve(__dirname, "..", "./.env.development")
        })
    ],
    module: {
        rules: [
            // https://webpack.js.org/loaders/css-loader/
            // https://webpack.js.org/loaders/style-loader/
            {
                test: /\.(css)$/i,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader"/* , options: { sourceMap: true } */ },
                ]
            }
        ]
    },
}