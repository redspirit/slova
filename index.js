const config = require('./lib/config');

const cmd = process.argv[2];
const port = parseInt(process.argv[3] || config.serverPort);

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

    const StaticServer = require('static-server');
    let serv = new StaticServer({
        rootPath: config.destinationDir,
        port: port,
    });
    serv.start(() => {
        console.log('Static server listening on', port);
    });

} else if (cmd === 'deploy') {
    // build + serve


} else {
    module.exports = {}
}