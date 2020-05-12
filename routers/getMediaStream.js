const info = {
    formats: [
        {
            "mimeType": "video/mp4; codecs=\"avc1.64001F, mp4a.40.2\"",
            "qualityLabel": "720p",
            "bitrate": 1419969,
            "audioBitrate": 192,
            "itag": 22,
            "url": "https://r3---sn-i3beln7k.googlevideo.com/videoplayback?expire=1589274401&ei=wRK6Xr_TBJDc4ALP1I7gBw&ip=35.220.175.223&id=o-AB8DT8DCsUPRh-RNEy9R-3YDDuyH9qz6n1BcNH2DZTYm&itag=22&source=youtube&requiressl=yes&mh=PA&mm=31%2C26&mn=sn-i3beln7k%2Csn-npoe7n76&ms=au%2Conr&mv=m&mvi=2&pl=20&initcwndbps=400000&vprv=1&mime=video%2Fmp4&ratebypass=yes&dur=29012.265&lmt=1567614674938635&mt=1589252675&fvip=3&beids=9466588&c=WEB&txp=5535432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAKU_l_cEKfqH4DuZ1Zh56IB201u1KaT8Jne7QzF440ZwAiAPSpIw__KYCztbKkQsZoyIZcDHumXVIGAHMuDyhf3PVA%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIgeCD89WXahBBhtC__b2sMpGN59-OXokaRZ2TyNiVLEnsCIQDOASV2-RMSX8qsPWWNXSIoDuthh0LOHOCQ-WXC1CDp1w%3D%3D",
            "width": 1280,
            "height": 720,
            "lastModified": "1567614674938635",
            "quality": "hd720",
            "fps": 30,
            "projectionType": "RECTANGULAR",
            "audioQuality": "AUDIO_QUALITY_MEDIUM",
            "approxDurationMs": "29012265",
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
const { setContentType, getTotalLength, rangeParse } = require('./utils')

module.exports = (server) => {
    server.route({
        method: 'GET',
        path: '/getstream',
        handler: async (request, h) => {

            let range = request.headers.range;
            let format = info.formats[0]
            try {
                let options = { range: rangeParse(range) }
                let stream = ytdl.downloadFromInfo(info, options);
                let totalLength = await getTotalLength(format, rangeParse(range).start, stream);
                let { start, end } = rangeParse(range, totalLength)
                console.log(start, end, totalLength)
                return h
                    .response(stream)
                    .code(206)
                    .type(setContentType(info))
                    .header('Content-Range', 'bytes ' + start + '-' + end + '/' + totalLength)
                    .header('Content-Length', start == end ? 0 : (end - start + 1))
            } catch (err) {
                console.log('ERR: ', err)
                return 'Oops, something went wrong';
            }
        }
    });
}