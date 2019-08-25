const YAML = require("yaml");
const JSON_ = require("json-to-pretty-yaml");
const _ = input => JSON_.stringify(input);
const $ = YAML.parse;

module.exports = { _, $ };
