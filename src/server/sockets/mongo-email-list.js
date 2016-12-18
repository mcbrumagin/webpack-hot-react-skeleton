/* @flow */
'use strict'

import mongoose from 'mongoose'

import {
  registerSocketListeners
} from './util'

import Email from '../data/mongo/email'

export default function mongoEmailSocketHandler(socket: any /* TODO? */) {

  console.log('mongoEmailSocketHandler')
  registerSocketListeners(socket, {
    'email:client:insert': (email) => {
      let result = new Email(email)
      console.log('insert', result)
    },
    'email:client:update': (email) => Email.findOneAndUpdate(email._id, email, (err, res) => {
      console.log(err || res)
    }),
    'email:client:delete': (email) => Email.delete(email)
  })

  //Email.find({}, { tailable: true }).each((err, entry) => {
  //  console.log({entry})
  //  if (err) console.log(err)
  //  else if (row.new_val && !row.old_val) {
  //    socket.emit(entityName + ":insert", row.new_val)
  //  }
  //  else if (row.new_val && row.old_val) {
  //    socket.emit(entityName + ":update", row.new_val)
  //  }
  //  else if (row.old_val && !row.new_val) {
  //    socket.emit(entityName + ":delete", { id: row.old_val.id })
  //  }
  //})

  mongoose.connection.once('open', function callback () {
    console.log('connected?')
    var collection = mongoose.connection.db.collection('oplog.rs')
    collection.find({}, {tailable: true}).each(function(err, entry) {
        if (err) {
            // handle error
        } else {
            // got a new oplog entry
            console.log('--- entry', entry)
        }
    })
});
}
