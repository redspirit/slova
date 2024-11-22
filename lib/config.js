const { readFileSync } = require('fs');
const merge = require('deepmerge')
const yaml = require('yaml');

let defaultConfig = {
    pagesDir: './pages',
    themeDir: './template',
    destinationDir: '/public',
    dateTimeFormat: 'DD.MM.YYYY',
    serverPort: 9090,
}

let configPath = './slova.yml';
let userConfig = {};
try {
    userConfig = yaml.parse(readFileSync(configPath).toString());
} catch (e) {
    console.error('[CONFIG] Parsing config error', e.toString())
}

module.exports = merge(defaultConfig, userConfig);