const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
    entry: {
        index: "./index.ts",
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
                test: /\.(ts|js)?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    hotReload: true,
                }
            },
            {
                test: /\.ts$/,
                loader: "ts-loader",
                options: { appendTsSuffixTo: [/\.vue$/] },
            },
            {
                test: /\.(css|less)$/,
                use: ["vue-style-loader", "css-loader", "less-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            "@comp": path.resolve(__dirname, "components"),
            "@store": path.resolve(__dirname, "store"),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "react index",
            filename: "index.html",
            chunks: ["index", "vendor"],
            template: "./index.temp.html",
        }),
        new ForkTsCheckerWebpackPlugin(),
        new VueLoaderPlugin(),
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
