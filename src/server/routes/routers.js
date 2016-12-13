/* @flow */
'use strict'

import fs from 'fs'
import { Router } from 'express'

import validationTest from './validation-test'

const router = Router()

router.get('/', (req, res) => {
  fs.readFile('./main.html', (err, text) => {
    if (err) res.send(JSON.stringify(err))
    else res.send(text.toString())
  })
})

router.get('*', (req, res) => {
  res.status(404).send('Not found')
})

router.put('*', (req, res) => {
  res.status(404).send('Not found')
})

router.post('*', (req, res) => {
  res.status(404).send('Not found')
})

router.delete('*', (req, res) => {
  res.status(404).send('Not found')
})

export default [validationTest, router]
