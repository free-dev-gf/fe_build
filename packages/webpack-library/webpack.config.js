/** @type {import('webpack').Configuration} */
module.exports = {
    entry: {
        index: "./src/index.js",
        numToWord: "./src/numToWord.js",
        wordToNum: "./src/wordToNum.js",
    },
    mode: "production",
    output: {
        filename: ({ chunk: { name } }) => {
            return name === "index" ? "webpack-numbers.js" : "[name].js";
        },
        libraryTarget: "umd",
        library: "webpackNumbers",
        globalObject: "this",
    },
    externals: [
        {
            lodash: {
                commonjs: "lodash",
                commonjs2: "lodash",
                amd: "lodash",
                root: "_",
            },
        },
    ],
};
