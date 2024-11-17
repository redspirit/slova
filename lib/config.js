const { readFileSync } = require('fs');
const core = require('@actions/core');
const merge = require('deepmerge')
const yaml = require('yaml');

const configPath = core.getInput('config') || './config.yml';

// let defaultConfig = yaml.parse(readFileSync('./default.config.yml').toString());
let defaultConfig = {};
let userConfig = {};
try {
    userConfig = yaml.parse(readFileSync(configPath).toString());
} catch (e) {
    console.error('[CONFIG] Parsing config error', e.toString())
}

module.exports = merge(defaultConfig, userConfig);