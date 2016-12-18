/* @flow */
'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const emailSchema = new Schema({
  email: String,
  created: { type: Date, default: Date.now }
}, { capped: 1024 })

const Email = mongoose.model('email', emailSchema)
export default Email
