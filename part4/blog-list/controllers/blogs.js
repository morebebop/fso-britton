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
blogRouter.post('/api/blogs', (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })
    blog.save()
        .then(savedBlog => {
        response.json(savedBlog)
        })
        .catch(error => next(error))
})

module.exports = blogRouter