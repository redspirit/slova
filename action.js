const core = require('@actions/core');
const config = require('./lib/config');
const build = require('./lib/build');

const destinationDir = core.getInput('path') || config.destinationDir;
core.setOutput('html_path', destinationDir);

console.log(`HTML generated: ${destinationDir}`);

build.start(destinationDir).then(() => {
    console.log('Generate: Done!');
}, (error) => {
    core.setFailed(error.message);
    //console.log('Build error', error.toString());
});