const config = require('./lib/config');
const argv = require('minimist')(process.argv.slice(2))._;
const port = config.serverPort;
const cmd = argv[0];

if (cmd === 'build') {
    // create html files
    console.log('Build site...');
    const build = require('./lib/build');

    build.start(config).then(() => {
        console.log('Done!');
    }, (error) => {
        console.log('Build error', error);
    });

} else if (cmd === 'serve') {
    // run static server

    const StaticServer = require('static-server');
    let serv = new StaticServer({
        rootPath: config.destinationDir,
        port,
    });
    serv.start(() => {
        console.log('Static server listening on', port);
    });

} else {
    module.exports = {
        build: require('./lib/build')
    }
}