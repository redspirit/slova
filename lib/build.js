const fse = require('fs-extra');
const Renderer = require('./Renderer');
const configFiller = require('./config');
const PagesManager = require('./PagesManager');
const { copyDirectoryRecursive } = require('./utils');

const start = async (_config) => {
    let config = configFiller(_config);
    // console.log(config);

    const pagesManager = new PagesManager(config.pagesDir, config);

    const destinationDir = config.destinationDir;
    const themeDir = config.themeDir;

    fse.emptyDirSync(destinationDir);
    copyDirectoryRecursive(themeDir, destinationDir, '.html,.htm');

    let renderer = new Renderer(themeDir, destinationDir);
    renderer.setContext(config.context || {});
    renderer.generateStatic(pagesManager);
};

module.exports = {
    start,
};
