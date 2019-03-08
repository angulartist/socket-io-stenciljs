'use strict'

const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const ent = require('ent')

const PORT = 3000

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

let users = []

io.on('connection', socket => {
  registerUser()

  socket.on('disconnect', () => {
    io.sockets.emit('disconnect')
  })
  socket.on('chat message', ({ content, senderId }) => {
    io.sockets.emit('chat message', content, senderId)
  })
  socket.on('typing', () => {
    socket.broadcast.emit('typing')
  })
  socket.on('nottyping', () => {
    socket.broadcast.emit('nottyping')
  })
  socket.on('user joined', () => {
    io.sockets.emit('user joined')
  })
})

const registerUser = () => {
  io.emit('welcome')
}

http.listen(PORT, () => {
  console.log(`listening on *:^${PORT}`)
})
