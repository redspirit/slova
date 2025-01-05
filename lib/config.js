const yaml = require('yaml');
const pathLib = require('path');
const merge = require('deepmerge');
const { readFileSync } = require('fs');
const argv = require('minimist')(process.argv.slice(2))._;

const relativePathParam = argv[1];
let rootPath = process.cwd();

if (relativePathParam) {
    rootPath = pathLib.resolve(rootPath, relativePathParam);
}

const toAbsolutePath = (path) => {
    return pathLib.join(rootPath, path);
};

module.exports = (defaults) => {
    const defaultConfig = {
        context: defaults?.context || {},
        pagesDir: defaults?.pagesDir || './pages',
        themeDir: defaults?.themeDir || './template',
        destinationDir: defaults?.destinationDir || './public',
        dateTimeFormat: defaults?.dateTimeFormat || 'DD.MM.YYYY',
        serverPort: defaults?.serverPort || 9090,
        rootPath,
    };

    let configPath = toAbsolutePath('./slova.yml');
    let userConfig = {};
    try {
        userConfig = yaml.parse(readFileSync(configPath).toString());
        if (userConfig.contextFile) {
            defaultConfig.context = yaml.parse(readFileSync(userConfig.contextFile).toString());
        }
    } catch (e) {
        console.error('[CONFIG] Parsing config error', e.toString());
    }

    let resultConfig = merge(defaultConfig, userConfig);

    resultConfig.pagesDir = toAbsolutePath(resultConfig.pagesDir);
    resultConfig.themeDir = toAbsolutePath(resultConfig.themeDir);
    resultConfig.destinationDir = toAbsolutePath(resultConfig.destinationDir);

    return resultConfig;
};