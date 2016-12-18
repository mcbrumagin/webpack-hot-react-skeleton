/* @flow */
'use strict'

import { createQueryRunner } from './util'

let runEmailQuery = createQueryRunner('email', 'test')

function createEmailChangeListener(dbConnection: any) {
  return runEmailQuery(dbConnection, {
    changes: {
      includeInitial: true,
      squash: true
    }
  })
}

function insertEmail(dbConnection: any, email: {email: string}) {
  return runEmailQuery(dbConnection, {
    insert: email
  })
}

function updateEmail(dbConnection: any, email: {email: string, id: string}) {
  let id = email.id
  delete email.id
  return runEmailQuery(dbConnection, {
    get: id,
    update: email
  })
}

function deleteEmail(dbConnection: any, email: {email: string, id: string}) {
  let id = email.id
  delete email.id
  return runEmailQuery(dbConnection, {
    get: id,
    delete: email
  })
}

export {
  insertEmail,
  updateEmail,
  deleteEmail,
  createEmailChangeListener
}
