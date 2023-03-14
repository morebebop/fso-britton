// imports
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const Person = require('./models/person')

var morgan = require('morgan')


// JSON Parser - this will allow the JSON request in the POST route to be parser and selected
app.use(express.json())
// makes express check for build directory first when receiving GET requests
app.use(express.static('build'))
// using cors() to allow the frontend (port 3000) to connect to the backend (port 3001)
app.use(cors())


// Middleware - Request Logger
app.use(morgan((tokens, request, response) => {
    // if a POST is submitted, then the content of the request will also be logged
    if (tokens.method(request, response) === 'POST') {
        return [
            tokens.method(request, response),
            tokens.url(request, response),
            tokens.status(request, response),
            tokens.res(request, response, 'content-length'), '-',
            tokens['response-time'](request, response), 'ms',
            JSON.stringify(request.body)
        ].join(' ')
    } else {
        return [
            tokens.method(request, response),
            tokens.url(request, response),
            tokens.status(request, response),
            tokens.res(request, response, 'content-length'), '-',
            tokens['response-time'](request, response), 'ms',
        ].join(' ')
    }
}))

// CREATE
app.post('/api/persons', (request, response) => {
    const body = request.body
    // catches any post requests that are missing either name or number. will revist this next commit to update
    // error handling response
    if (body.name === undefined || body.number === undefined) {
        response.statusMessage = 'content missing'
        return response.status(400).end()
    }
    const person = new Person({
        // assign id a random int between 0 and 10000
        id: Math.random() * (10000),
        name: body.name,
        number: body.number,
    })
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

// READ
app.get('/api/persons', (request, response) => {
    // looping through all objects in Person, then sending back the json for them
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    // checks that the id exists. if a person object with the specified id does not exists, then a 404 error will be thrown
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        response.send(
            `Phonebook has info for ${persons.length} people 
            <br/>
            ${Date()}`
        )
    })
})

// UPDATE
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
        response.json(updatedPerson)
    })
    .catch(error => next(error))
})

// DELETE
app.delete('/api/persons/:id', (request, response, next) => {
    // finds the person by id, deletes it, and return a 204 for confirmed deletion
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

// Error Handlers
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id'})
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})