const core = require('@actions/core');
const build = require('./lib/build');

const configPath = core.getInput('context');
const destinationDir = core.getInput('path');
const pagesDir = core.getInput('pages');
const themeDir = core.getInput('theme');
core.setOutput('html_path', destinationDir);

if (!destinationDir) {
    throw new Error('Destination directory is required');
}

if (!pagesDir) {
    throw new Error('Pages directory is required');
}

if (!themeDir) {
    throw new Error('Theme directory is required');
}

console.log(`HTML generated: ${destinationDir}`);

let params = {
    configPath,
    destinationDir,
    pagesDir,
    themeDir,
    dateTimeFormat: 'DD.MM.YYYY',
}

build.start(params).then(() => {
    console.log('Generate: Done!');
}, (error) => {
    core.setFailed(error.message);
});