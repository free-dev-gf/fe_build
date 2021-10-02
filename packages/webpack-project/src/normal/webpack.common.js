const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PrefetchPreloadPlugin = require("../plugins/prefetch-preload-plugin.js");

/** @type {import('webpack').Configuration} */
module.exports = {
    entry: {
        index: "./index.js",
        print: "./print.js",
    },
    cache: true,
    // entry: {
    //   index: {
    //     import: './src/index.js',
    //     dependOn: 'shared'
    //   },
    //   print: {
    //     import: './src/print.js',
    //     dependOn: 'shared'
    //   },
    //   shared: 'lodash'
    // },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
        assetModuleFilename: "assets/[name][ext]",
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/i,
                use: [
                    "style-loader",
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                            // hmr: true,
                        },
                    },
                    "css-loader",
                    "less-loader",
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)/i,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 5 * 1024, // 5kb
                    },
                },
            },
            {
                test: /\.(woff|ttf|eot|otf|woff2)/i,
                type: "asset/resource",
            },
            {
                test: /\.xml$/i,
                use: ["xml-loader"],
            },
            {
                test: /\.mp3$/i,
                use: ["mp3-loader"],
            },
            {
                test: /\.txt$/i,
                use: [{
                    loader: "txt-loader",
                    options: {
                        filePath: path.resolve(__dirname, 'common.txt'),
                    }
                }],
            },
        ],
    },
    resolveLoader: {
        alias: {
          'mp3-loader': path.resolve(__dirname, '../loaders/mp3-loader.js'),
          'txt-loader': path.resolve(__dirname, '../loaders/txt-loader.js'),
        },
      },
    plugins: [
        new HtmlWebpackPlugin({
            title: "manage output",
            template: "./index.template.html",
        }),
        new WebpackManifestPlugin(),
        new MiniCssExtractPlugin(),
        new PrefetchPreloadPlugin({
            prefetch: [/chart_js\.(.*?)\.js/],
            preload: [/login_modal_js\.(.*?)\.js/],
        }),
        new webpack.DefinePlugin({
            "process.env.ASSET_PATH": JSON.stringify("/asset"),
        }),
        new webpack.ProvidePlugin({
            // _: "lodash",
            join: ["lodash", "join"],
        }),
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
