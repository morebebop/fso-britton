// imports
var express = require('express')
var morgan = require('morgan')

const app = express()

// JSON Parser - this will allow the JSON request in the POST route to be parser and selected
app.use(express.json())

// hardcoded persons database. will separate out to actual db after lesson
let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

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
    if (!body.name || !body.number) {
        response.statusMessage = 'name must be unique'
        return response.status(400).end()
    }
    const person = {
        // assign id a random int between 0 and 10000
        id: Math.random() * (10000),
        name: body.name,
        number: body.number,
    }
    persons = persons.concat(person)
    response.json(person)
})

// READ
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    // assign id const the value of the id string passed in request. converting it from a string to
    // a number so that it can be compared to person.id whi
    const id = Number(request.params.id)
    // finding the person wtih an id that matches the id in the request
    const person = persons.find(person => person.id === id)
    // checks that a person with a matching request id exists. if so, respond with the persons info
    if (person) {
        return response.json(person)
    // otherwise, throw a 404 error and stop the application
    } else {
        return response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    response.send(
        `Phonebook has info for ${persons.length} people 
        <br/>
        ${Date()}`
    )
})

// DELETE
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    return response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})