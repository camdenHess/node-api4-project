require('dotenv').config()
const express = require('express')
const cors = require('cors')

const server = express()

const PORT = process.env.PORT || 9000

server.use(express.json())
server.use(cors())

const initialUsers = () => ([
    {
        username: 'ted',
        password: 'mynameisted'
    },
    {
        username: 'jeff',
        password: 'jeffismyname'
    },
    {
        username: 'mary',
        password: 'marymaryhadalittlelamb'
    }
])

let users = initialUsers()

server.get('/api/users', (req, res, next) => {
    res.status(200).json(users)
})

server.post('/api/register', (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
        res.status(400).json({
            message: 'username and password are required'
        })
    } else {
        const newUser = {username: username, password: password}
        users.push(newUser)
        res.status(201).json(newUser)
    }
})

server.use('*', (req, res) => {
    res.send('<h1>Hello!</h1>')
})

server.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
})

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})