const babelConfig = require("./babel.config.js");
const babelProcessor = require("babel-jest").createTransformer(babelConfig);

module.exports = babelProcessor;
