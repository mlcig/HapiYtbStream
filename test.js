const ytdl = require('ytdl-core')
const readline = require('readline');
const path = require('path');
const fs = require('fs');

const url = 'https://www.youtube.com/watch?v=WhXefyLs-uw';
const output = path.resolve(__dirname, 'video.mp4');

const video = ytdl(url);
video.pipe(fs.createWriteStream(output));

const p = new Promise((res, rej) => {
    video.on('progress', (chunkLength, downloaded, total) => {
        res(total)
    });
    video.on('end', () => {
    })
    process.stdout.write('\n\n');
});

async function start(){
    console.log(await p)
}

start()