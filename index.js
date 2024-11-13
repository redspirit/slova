const StaticServer = require('static-server');
const build = require('./lib/build');
const { serverEnable, serverPort, destinationDir} = require('./lib/config');

if (serverEnable) {
    // run http static server
    let serv = new StaticServer({
        rootPath: destinationDir,
        port: serverPort,
    });
    serv.start(() => {
        console.log('Static server listening on', serverPort);
    });
}

build.start().then((result) => {
    console.log('Build is ok');
}, (error) => {
    console.log('Build error', error);
});