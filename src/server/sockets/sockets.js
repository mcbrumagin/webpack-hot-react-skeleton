/* @flow */
'use strict'

import rethinkInit from '../data/rethink/init'
import rethinkEmailSocketHandler from './rethink-email-list'
import mongoEmailSocketHandler from './mongo-email-list'

function mixinRethinkConnection(handler) {
  return function socketHandler(socket: any /* TODO? */) {
    rethinkInit((connection) => handler(socket, connection))
  }
}

export default [
  //mixinRethinkConnection(rethinkEmailSocketHandler),
  mongoEmailSocketHandler
]
