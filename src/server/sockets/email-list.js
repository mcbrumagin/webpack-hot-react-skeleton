/* @flow */
'use strict'

import {
  registerSocketListeners,
  createSocketEventEmitter
} from './util'

import {
  insertEmail,
  updateEmail,
  deleteEmail,
  createEmailChangeListener
} from '../datasources/rethink-email'

export default function socketHandler(socket: any /* TODO? */, dbConnection: any /* TODO? */) {


  registerSocketListeners(socket, {
    'email:client:insert': (email) => insertEmail(dbConnection, email),
    'email:client:update': (email) => updateEmail(dbConnection, email),
    'email:client:delete': (email) => deleteEmail(dbConnection, email)
  })

  createEmailChangeListener(dbConnection)
  .then(createSocketEventEmitter(socket, 'email'))
}
