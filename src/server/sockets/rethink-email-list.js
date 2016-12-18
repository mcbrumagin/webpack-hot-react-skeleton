/* @flow */
'use strict'

import {
  registerSocketListeners
} from './util'

import {
  insertEmail,
  updateEmail,
  deleteEmail,
  createEmailChangeListener
} from '../data/rethink/email'

function createRethinkSocketEventEmitter(socket: any /* TODO? */, entityName: string) {
  return (rows: any /* TODO? */) => {
    rows.each(function(err, row) {

      if (err) console.log(err)
      else if (row.new_val && !row.old_val) {
        socket.emit(entityName + ":insert", row.new_val)
      }
      else if (row.new_val && row.old_val) {
        socket.emit(entityName + ":update", row.new_val)
      }
      else if (row.old_val && !row.new_val) {
        socket.emit(entityName + ":delete", { id: row.old_val.id })
      }
    })

    socket.on('disconnect', () => rows.close())
  }
}

export default function rethinkEmailSocketHandler(socket: any /* TODO? */, dbConnection: any /* TODO? */) {

  registerSocketListeners(socket, {
    'email:client:insert': (email) => insertEmail(dbConnection, email),
    'email:client:update': (email) => updateEmail(dbConnection, email),
    'email:client:delete': (email) => deleteEmail(dbConnection, email)
  })

  createEmailChangeListener(dbConnection)
  .then(createRethinkSocketEventEmitter(socket, 'email'))
}
