/* @flow */
'use strict'

import rethinkdb from 'rethinkdb'

function initializeDatabase(callback: Function) {
  return rethinkdb.connect({
      host: 'localhost',
      port: 28015
  }).then((dbConnection) => {
    return rethinkdb.db('test').tableCreate('email').run(dbConnection)
    .catch((err) => console.warn(err.message))
    .finally(() => callback(dbConnection))
  })
}

export default initializeDatabase
