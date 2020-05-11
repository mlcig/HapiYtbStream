const ytdl = require('ytdl-core');

module.exports = (server) => {
    // server = require('@hapi/hapi').server()
    server.route({
        method: 'GET',
        path: '/getinfo/{vid}',
        handler: async (request, h) => {

            try {
                let info = await ytdl.getInfo(request.params.vid)
                return info.formats
            } catch (err) {
                return 'Oops, something went wrong';
            }

        }
    });
}