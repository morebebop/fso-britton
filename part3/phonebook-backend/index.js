// import express
const express = require('express')
const app = express()

// hardcoded persons database. will separate out to actual db after lesson
const persons = [
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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})