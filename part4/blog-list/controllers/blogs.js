// assigning the express router to blogRouter to run routes on
const blogRouter = require('express').Router()
// pulling in the blog schema
const Blog = require('../models/blog')

// READ
blogRouter.get('/api/blogs', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
})
  
// CREATE
blogRouter.post('/api/blogs', (request, response) => {
const blog = new Blog(request.body)
    Blog
        .save()
        .then(result => {
        response.status(201).json(result)
        })
})

module.exports = blogRouter