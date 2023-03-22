const mongoose = require('mongoose')

// schema for the blog data entered into the database
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

  module.exports = mongoose.model('Blog', blogSchema)