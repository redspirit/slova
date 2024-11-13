const { readFileSync } = require('fs');
const merge = require('deepmerge')
const yaml = require('yaml');

let defaultConfig = yaml.parse(readFileSync('./default.config.yml').toString());
let userConfig = {};
try {
    userConfig = yaml.parse(readFileSync('./config.yml').toString());
} catch (e) {
    console.error('[CONFIG] Parsing config error', e.toString())
}

module.exports = merge(defaultConfig, userConfig);