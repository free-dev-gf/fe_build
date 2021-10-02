const { parse } = require("node-html-parser");

class PrefetchPreloadPlugin {
    constructor(options = {}) {
        this.options = options;
    }

    apply(compiler) {
        const { prefetch, preload } = this.options;
        if (!prefetch && !preload) {
            console.error("[PrefetchPreloadPlugin] No options!");
        }
        const pluginName = PrefetchPreloadPlugin.name;
        const prefetchTags = [],
            preloadTags = [];
        const { RawSource } = compiler.webpack.sources;
        compiler.hooks.emit.tapAsync(pluginName, (compilation, callback) => {
            Object.keys(compilation.assets).forEach((key) => {
                // const source = compilation.assets[key];
                // console.log(
                //     key,
                //     "\n",
                //     source.source().slice(0, 100),
                //     "\n",
                //     Buffer.isBuffer(source.source()),
                //     "\n",
                //     source.size()
                // );
                if (prefetch.find((p) => p.test(key))) {
                    prefetchTags.push(key);
                }
                if (preload.find((p) => p.test(key))) {
                    preloadTags.push(key);
                }
            });
            const htmlSource = compilation.assets["index.html"].source();
            const { publicPath } = compiler.options.output;
            const basePath = publicPath === 'auto' ? '' : publicPath;
            compilation.assets["index.html"] = {
                source() {
                    const root = parse(htmlSource);
                    const head = root.querySelector("head");
                    if (!head) {
                        console.error(
                            "[PrefetchPreloadPlugin] not found head tag in html file."
                        );
                        return htmlSource;
                    }
                    prefetchTags.forEach((filename) => {
                        head.innerHTML += `<link rel="prefetch" href="${basePath}${filename}" as="script" />`;
                    });
                    preloadTags.forEach((filename) => {
                        head.innerHTML += `<link rel="preload" href="${basePath}${filename}" as="script" />`;
                    });
                    return root.toString();
                },
                size() {
                    return this.source().length;
                },
            };
            callback();
        });
    }
}

module.exports = PrefetchPreloadPlugin;
