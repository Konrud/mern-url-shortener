const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "..", "./src/index.js"),
    output: {
        path: path.resolve(__dirname, "..", "./dist"),
        filename: "[name].[contenthash].bundle.js",
        publicPath: "/"
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"]
    },
    plugins: [
        // 
        // https://github.com/jaketrent/html-webpack-template/blob/86f285d5c790a6c15263f5cc50fd666d51f974fd/index.html
        // https://github.com/jaketrent/html-webpack-template
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "..", "./src/index.html")
        }),
        new CleanWebpackPlugin(),
        // https://webpack.js.org/plugins/copy-webpack-plugin/
        // https://github.com/sindresorhus/globby#options
        // https://github.com/webpack-contrib/copy-webpack-plugin/issues/493 (how to properly use ignore)
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "..", "./src/assets/images/favicons"),
                    // copy all files from the directory except for files from `ignore`
                    globOptions: {
                        ignore: ['**.txt']
                    },
                    to: path.resolve(__dirname, "..", "dist")
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(png|jpe?g|bmp|webp|gif|ico)$/i,
                loader: "file-loader",
                options: {
                    outputPath: "./static/images"
                }
            },
            {
                test: /\.(woff|woff2|ttf)$/i,
                loader: "file-loader",
                options: {
                    outputPath: "./static/fonts"
                }
            },
            // https://webpack.js.org/loaders/html-loader/
            {
                test: /\.html?$/i,
                loader: "html-loader"
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "..", "./dist"),
        hot: true,
        historyApiFallback: true
    }
}