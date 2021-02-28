const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const clinicRoutes = require('./routes/clinic')
const authRoutes = require('./routes/auth')
const medicalCaseRoutes = require('./routes/medicalCase')
const conversationRoutes = require('./routes/conversation')
// const chatMatesRoutes = require('./routes/chatMates')
const messageRoutes = require('./routes/message')
const handlers = require('./messagesHandlers/createMessage')
const userRoutes = require('./routes/user')
const medicineRoute = require('./routes/medicine')
const pushNotificationsRoutes = require('./routes/pushNotifications')
const adminRoutes = require('./routes/admin')

const ENV = require('./env.js')
const PORT = 8080
const app = express()
const socket = require('socket.io')
const server = app.listen(PORT)
const io = socket(server)
const sockets = {}

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use('/clinic', clinicRoutes)

app.use('/auth', authRoutes)

app.use('/medicalCase', medicalCaseRoutes)

app.use('/conversation', conversationRoutes)

app.use('/message', messageRoutes)

// app.use('/chatMates', chatMatesRoutes)

app.use('/user', userRoutes)

app.use('/medicine', medicineRoute)

app.use('/pushNotifications', pushNotificationsRoutes)

app.use('/admin', adminRoutes)

app.use((error, req, res, next) => {
  console.log(error)
  const status = error.statusCode || 500
  const message = error.message
  const data = error.data
  res.status(status).json({ message: message, data: data })
})

io.on('connection', (socket) => {
  socket.on('init', (userId) => {
    sockets[userId.senderId] = socket
  })
  socket.on('message', (message) => {
    if (sockets[message.receiverId]) {
      sockets[message.receiverId].emit('message', message)
    }
    handlers.createMessage(message)
  })
  socket.on('disconnect', (userId) => {
    delete sockets[userId.senderId]
  })
})

mongoose
  .connect(ENV.keys.mongoKey, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .catch((err) => console.log(err))
