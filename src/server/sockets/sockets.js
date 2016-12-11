/* @flow */
'use strict'

import rethinkInit from '../datasources/rethink-init'
import emailSocketHandler from './email-list'

function mixinRethinkDbConnection(handler) {
  return function rethinkSocketHandler(socket: any /* TODO? */) {
    rethinkInit(
      (connection) => handler(socket, connection),
      (err) => console.log('Error connecting to RethinkDB...', err)
    )
  }
}

export default [
  mixinRethinkDbConnection(emailSocketHandler)
]
