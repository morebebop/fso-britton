const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

// pulls mongodb authentication credentials for database
const config = require('./utils/config')

// schema for the blog data entered into the database
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

// allows mongoose to return all documents in the model
mongoose.set('strictQuery', false)
// connects to the mongodb
mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

// READ
app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

// CREATE
app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})