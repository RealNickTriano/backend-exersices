const express = require('express')
const app = express()
const PORT = 3001

app.use(express.json())

let data = [
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

app.get('/', (req, res) => {
    res.send('<h1>Phonebook API</h1>')
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${data.length} people</p>
        <p>${new Date()}</p>`)
})

app.get('/api/persons', (req, res) => {
    res.json(data)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    console.log(id)
    const entry = data.find(item => item.id === id)
    console.log(entry)
    if (entry)
    {
        res.json(entry)
    }
    else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    data = data.filter(item => item.id !== id)
    res.send(204).end()
})

app.post('/api/persons/', (req, res) => {
    const id = Math.floor(Math.random() * 100000)

    if(!req.body.name)
    {
        return res.status(400).json({
            error: 'name missing'
        })
    }
    else if(!req.body.number)
    {
        return res.status(400).json({
            error: 'number missing'
        })
    }
    else if(data.filter(item => item.name !== req.body.name).length)
    {
        return res.status(400).json({
            error: 'name already exists'
        })
    }

    const post = {
        id: id,
        name: req.body.name, 
        number: req.body.number
    }

    console.log(post)

    data.concat(post)

    res.json(post)
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})