require('dotenv').config()

// pulling the port
const PORT = process.env.PORT
// pulling the mongo url
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
    MONGODB_URI,
    PORT
}