const getInfo = require('./getInfo');
const getMediaStream = require('./getMediaStream');

module.exports = (server) => {

    getInfo(server);
    getMediaStream(server);
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });
}
