const info = {
    formats: [
        {
            "mimeType": "video/mp4; codecs=\"avc1.64001F, mp4a.40.2\"",
            "qualityLabel": "720p",
            "bitrate": 519563,
            "audioBitrate": 192,
            "itag": 22,
            "url": "https://r4---sn-i3beln7r.googlevideo.com/videoplayback?expire=1589195638&ei=Ft-4XvOnJYSds8IPx--t6Ag&ip=35.241.109.25&id=o-ADOqFlpa1ucm6YYsftuEMxYitBHyEmy3a7aFwV1xcL_t&itag=22&source=youtube&requiressl=yes&mh=ZV&mm=31%2C29&mn=sn-i3beln7r%2Csn-i3b7knse&ms=au%2Crdu&mv=m&mvi=3&pl=21&initcwndbps=2080000&vprv=1&mime=video%2Fmp4&ratebypass=yes&dur=998.365&lmt=1587812963085803&mt=1589173950&fvip=4&beids=9466587&c=WEB&txp=5535432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIgI3NXWn-AIlarUlXebVa6d0AdMMYXUqI493461f0SO34CIQCZOYI94Mw3kSLpAMjlPmmbh4xV-HpxuDsA9ae6dGYYNg%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIgFrWohe9ZlMEHhnSdVm2c2nu1PTMoFW-ZgHKv2tklUWMCIQCuE2bdwPFFSdwmxtcf82z1YNCGfKo4LHfKzpujOHFJZQ%3D%3D",
            "width": 1280,
            "height": 720,
            "lastModified": "1587812963085803",
            "quality": "hd720",
            "projectionType": "RECTANGULAR",
            "audioQuality": "AUDIO_QUALITY_MEDIUM",
            "approxDurationMs": "998365",
            "audioSampleRate": "44100",
            "audioChannels": 2,
            "container": "mp4",
            "codecs": "avc1.64001F, mp4a.40.2",
            "live": false,
            "isHLS": false,
            "isDashMPD": false
        }
    ],
    full: true
}

/****info is a moc data,if will get from post */
const ytdl = require('ytdl-core');
const { setContentType, getContentLength, rangeParse } = require('./utils')

module.exports = (server) => {
    server.route({
        method: 'GET',
        path: '/getstream',
        handler: async (request, h) => {

            let range = request.headers.range;
            console.log('range: ', range)
            let format = info.formats[0]
            try {
                let options = { range: rangeParse(range) }
                console.log(options)
                let stream = ytdl.downloadFromInfo(info, options);
                let streamSize = await getContentSize(format, stream);
                let {start,end} = rangeParse(range,streamSize)
                console.log(start,end)
                return h
                    .response(stream)
                    .code(206)
                    .type(setContentType(info))
                    .header('Content-Range', 'bytes ' + start + '-' + end + '/' + streamSize)
                    .header('Content-Length', start == end ? 0 : (end - start + 1))
            } catch (err) {
                return 'Oops, something went wrong';
            }

        }
    });
}