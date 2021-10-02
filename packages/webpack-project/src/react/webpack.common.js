const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
    entry: {
        index: ["react-hot-loader/patch", "./index.tsx"],
        mine: ["react-hot-loader/patch", "./mine.tsx"],
    },
    cache: true,
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "@components": path.resolve(__dirname, "components"),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "react index",
            filename: "index.html",
            chunks: ["index", "vendor"],
            template: "./index.temp.html",
        }),
        new HtmlWebpackPlugin({
            title: "react mine",
            filename: "mine.html",
            chunks: ["mine", "vendor"],
            template: "./index.temp.html",
        }),
        new ForkTsCheckerWebpackPlugin(),
    ],
    optimization: {
        moduleIds: "deterministic",
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                },
            },
        },
    },
};
