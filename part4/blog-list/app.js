// pulls mongodb authentication credentials for database
const config = require('./utils/config')
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
// pulls in routes to use
const blogRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

// allows mongoose to return all documents in the model
mongoose.set('strictQuery', false)
// connects to the mongodb
mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use('/', blogRouter)

module.exports = app