const { readFileSync } = require('fs');
const merge = require('deepmerge');
const yaml = require('yaml');
const argv = require('minimist')(process.argv.slice(2));

let defaultConfig = {
    pagesDir: './pages',
    themeDir: './template',
    destinationDir: '/public',
    dateTimeFormat: 'DD.MM.YYYY',
    serverPort: 9090,
}

console.log('Args', argv);

let configPath = './slova.yml';
let userConfig = {};
try {
    userConfig = yaml.parse(readFileSync(configPath).toString());
} catch (e) {
    console.error('[CONFIG] Parsing config error', e.toString())
}

module.exports = merge(defaultConfig, userConfig);