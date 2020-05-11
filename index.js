'use strict';

const Hapi = require('@hapi/hapi');
const importRouters = require('./routers');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    importRouters(server)

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();