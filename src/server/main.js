/* @flow */
'use strict'

import http from 'http'
import express from 'express'
import socketio from 'socket.io'
import fs from 'fs'
import routers from './routes/routers'
import sockets from './sockets/sockets'

const app = express()
let port: number
let mainHtmlPath: string

if (process.env.NODE_ENV === 'production') {
  mainHtmlPath = './client/main.html'
  port = 80

  app.use(express.static('./client/'))
} else {
  mainHtmlPath = './src/client/main.html'
  port = 3000

  const { devMiddlware, hotMiddleware } = require('./webpack-middleware')
  app.use(devMiddlware)
  app.use(hotMiddleware)
}

app.get('/', (req, res) => {
  fs.readFile(mainHtmlPath, (err, text) => {
    if (err) res.send(JSON.stringify(err))
    else res.send(text.toString())
  })
})

for (let router of routers) {
  app.use(router)
}

const server = http.createServer(app)

const io = socketio(server)
io.on('connection', (socket) => {
  for (let handler of sockets) {
    handler(socket)
  }
})

server.listen(port, () => console.log(`Listening on port ${port}`))
