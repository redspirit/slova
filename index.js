const argv = require('minimist')(process.argv.slice(2))._;
const cmd = argv[0];

if (cmd === 'build') {
    // create html files
    console.log('Build site...');
    const build = require('./lib/build');

    build.start().then(() => {
        console.log('Done!');
    }, (error) => {
        console.log('Build error', error);
    });

} else if (cmd === 'serve') {
    // run static server

    const {serverPort, destinationDir} = require('./lib/config');
    const StaticServer = require('static-server');
    let serv = new StaticServer({
        rootPath: destinationDir,
        port: serverPort,
    });
    serv.start(() => {
        console.log('Static server listening on', serverPort);
    });

} else {
    module.exports = {
        build: require('./lib/build')
    }
}