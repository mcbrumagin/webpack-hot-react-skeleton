/* @flow */
'use strict'

import http from 'http'
import express from 'express'
import socketio from 'socket.io'

import routers from './routes/routers'
import sockets from './sockets/sockets'

/*
// TODO: REMOVE
import axios from 'axios'

setTimeout(() => {
  axios.get('http://127.0.0.1:3000/validation-lol', {email:'test@lolzzz'})
    .then((res) => console.log('yeahhhhh', res))
    .catch((err) => console.log('errrr', err.message, err.response.data))
}, 5000)
*/

const app = express()
let port: number

if (process.env.NODE_ENV === 'production') {
  port = process.env.npm_package_config_productionPort || 80
  app.use(express.static('./client/'))
}
else {
  const {
    devMiddlware,
    hotMiddleware
  } = require('./middleware')

  port = process.env.npm_package_config_port || 3000
  app.use(devMiddlware)
  app.use(hotMiddleware)
}

for (let router of routers)
  app.use(router)

const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {
  for (let handler of sockets)
    handler(socket)
})

server.listen(port, () => console.log(`Listening on port ${port}`))
