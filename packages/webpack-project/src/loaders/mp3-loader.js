const path = require('path');

module.exports = function(source, map) {
    const filename = path.basename(this.resourcePath);
    const assetInfo = { sourceFilename: filename };
    this.emitFile(filename, source, null, assetInfo);
    this.emitFile(filename, source);

    return `export default '<audio controls src="${filename}" />'`;
};

module.exports.raw = true;
