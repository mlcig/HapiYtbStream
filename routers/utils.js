const rangeParse = (range, size) => {
    let result = {}, start, end
    if (range) {
        if (typeof (range) !== 'string') {
            throw new Error('RANGE SHOULD BE A STRING')
        } else {
            let arr = range.split(/bytes=([0-9]*)-([0-9]*)/)
            start = parseInt(arr[1]);
            end = parseInt(arr[2]);
        }
    }

    result = {
        start: isNaN(start) ? 0 : start,
        end
    }
    if (size) {
        result.end = isNaN(end) ? (size - 1) : end
    } else {
        isNaN(result.end) ? delete result.end : ''
    }
    return result
}

const videoAudio = format => !!format.qualityLabel ? 'video' : 'audio'
const setContentType = info => {
    let format = info.formats[0]
    return `${videoAudio(format)}/${format.container}`
}

const getContentSize = (format, stream) => {
    if (format.contentLength) {
        return format.contentLength
    } else {
        return new Promise((resolve, reject) => {
            stream.on('progress', (a, b, c) => {
                resolve(c);
            })
        })
    }
}

module.exports = {
    setContentType,
    getContentSize,
    rangeParse
}

console.log(rangeParse())