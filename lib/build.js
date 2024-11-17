const fse = require('fs-extra');
const config = require('./config');
const PagesManager = require('./PagesManager');
const Renderer = require('./Renderer');
const { copyDirectoryRecursive } = require('./utils');

const pagesManager = new PagesManager(config.pagesDir);

const start = async (outputDir) => {
    const themeDir = config.themeDir;

    fse.emptyDirSync(outputDir);
    copyDirectoryRecursive(themeDir, outputDir, '.html,.htm');

    let renderer = new Renderer(themeDir, outputDir);
    renderer.setContext(config.context);
    renderer.generateStatic(pagesManager);
}

module.exports = {
    start
}