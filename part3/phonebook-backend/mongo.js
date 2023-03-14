const mongoose = require('mongoose')

// checks that a password is passed
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

// uses the password variable to complete url for database
const url = `mongodb+srv://brittonjwright:${password}@cluster0.v9vub56.mongodb.net/phonbookApp?retryWrites=true&w=majority`

// connects to database using url const. if password is not correct, then this will fail
mongoose.set('strictQuery', false)
mongoose.connect(url)

// defining the schema for the person object
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

// assigning the Person object the schema
const Person = mongoose.model('Person', personSchema)

// if only a password is passed and not a new person in the terminal, then this returns a list of the current persons in the database
if (process.argv.length < 4) {
    return (
        Person.find({}).then(result => {
            result.forEach(person => {
                console.log(person.name, person.number)
                mongoose.connection.close()
            })
        })
    )
}

// assigns person the values passed in the terminal.
const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})

// saves and closes the database
person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})