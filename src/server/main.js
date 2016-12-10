/* @flow */
'use strict'

import express from 'express'
import fs from 'fs'
import { isEmail } from '../shared/validators'

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

app.post('/validation-test', (req, res) => {
  let data = ''
  req.on('readable', () => {
    let chunk: string
    while (null !== (chunk = req.read()) ) data += chunk
  })
  req.on('end', () => {
    let form = JSON.parse(data)
    if (!isEmail(form.email)) res.status(400).send('Invalid email')
    else res.send('OK')
  })
})

app.listen(port, () => console.log(`Listening on port ${port}`))
