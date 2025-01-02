const yaml = require('yaml');
const {readFileSync} = require('fs');
const core = require('@actions/core');
const build = require('./lib/build');

const contextFileName = core.getInput('context');
const destinationDir = core.getInput('path');
const pagesDir = core.getInput('pages');
const themeDir = core.getInput('theme');
core.setOutput('html_path', destinationDir);

let context = {};
if (contextFileName) {
    context = yaml.parse(readFileSync(contextFileName).toString());
}

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
    context,
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