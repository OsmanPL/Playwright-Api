require('dotenv').config();

const port = process.env.PORT
const clientKey = process.env.CLIENT_KEY
const brave = process.env.PATH_BRAVE
const edge = process.env.PATH_EDGE

// Function convert image url to base64
async function imageUrlToBase64(url) {
    try {
        const response = await fetch(url);
        const blob = await response.arrayBuffer();
        const contentType = response.headers.get('content-type');
        const base64String = `data:${contentType};base64,${Buffer.from(
            blob,
        ).toString('base64')}`;
        return base64String;
    } catch (err) {
        console.error(err);
    }
}

module.exports = { port, clientKey, edge, brave, imageUrlToBase64 }