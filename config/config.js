require('dotenv').config();

const port = process.env.PORT
const clientKey = process.env.CLIENT_KEY

module.exports = { port, clientKey }