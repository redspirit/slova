const { readFileSync } = require('fs');
const pathLib = require('path');
const merge = require('deepmerge');
const yaml = require('yaml');
const argv = require('minimist')(process.argv.slice(2))._;

const relativePathParam = argv[1];
let rootPath = process.cwd();

if (relativePathParam) {
    rootPath = pathLib.resolve(rootPath, relativePathParam);
}

const defaultConfig = {
    pagesDir: './pages',
    themeDir: './template',
    destinationDir: '/public',
    dateTimeFormat: 'DD.MM.YYYY',
    serverPort: 9090,
    rootPath,
};

const toAbsolutePath = (path) => {
    return pathLib.join(rootPath, path);
};

let configPath = toAbsolutePath('./slova.yml');
let userConfig = {};
try {
    userConfig = yaml.parse(readFileSync(configPath).toString());
} catch (e) {
    console.error('[CONFIG] Parsing config error', e.toString());
}

let resultConfig = merge(defaultConfig, userConfig);

resultConfig.pagesDir = toAbsolutePath(resultConfig.pagesDir);
resultConfig.themeDir = toAbsolutePath(resultConfig.themeDir);
resultConfig.destinationDir = toAbsolutePath(resultConfig.destinationDir);

module.exports = resultConfig;
