const fse = require('fs-extra');
const PagesManager = require('./PagesManager');
const Renderer = require('./Renderer');
const { copyDirectoryRecursive } = require('./utils');

const start = async (config) => {
    // console.log(config);

    const pagesManager = new PagesManager(config.pagesDir);

    const destinationDir = config.destinationDir;
    const themeDir = config.themeDir;

    fse.emptyDirSync(destinationDir);
    copyDirectoryRecursive(themeDir, destinationDir, '.html,.htm');

    let renderer = new Renderer(themeDir, destinationDir);
    renderer.setContext(config.context || {});
    renderer.generateStatic(pagesManager);
}

module.exports = {
    start
}