const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        static: "./dist",
        hot: true,
        proxy: [
            {
                context: ["/auth", "/api"],
                target: "http://localhost:3000",
            },
        ],
    },
});
