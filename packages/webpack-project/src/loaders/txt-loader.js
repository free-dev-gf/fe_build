const fs = require("fs");
const loaderUtils = require("loader-utils");
const { validate } = require("schema-utils");

const schema = {
    type: "object",
    properties: {
        filePath: {
            type: "string",
        },
    },
};

module.exports = function(source) {
    const options = loaderUtils.getOptions(this);
    validate(schema, options, {
        name: "Txt Loader",
        baseDataPath: "options",
    });
    const callback = this.async();
    this.addDependency(options.filePath);
    (async () => {
        const common = await fs.readFileSync(options.filePath);
        const content = `${source.toString()}\n${common}`;

        return `export default ${JSON.stringify(content)}`;
    })().then(
        (res) => callback(undefined, res),
        (err) => callback(err)
    );
};

