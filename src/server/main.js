/* @flow */
'use strict'

import "babel-polyfill"
import http from 'http'
import express from 'express'
import socketio from 'socket.io'

import routers from './routes/routers'
import sockets from './sockets/sockets'


const app = express()
let port

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

let listen: any = server.listen.bind(server) // TODO: Remove hack to mute flow error
listen(port, () => console.log(`Listening on port ${port}`))
