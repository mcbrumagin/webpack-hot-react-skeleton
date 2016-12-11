/* @flow */
'use strict'

import { Router } from 'express'

import { isEmail } from '../../shared/validators'
const router = Router()

router.post('/validation-test', (req, res) => {
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

export default router
