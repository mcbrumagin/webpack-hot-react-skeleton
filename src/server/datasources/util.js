/* @flow */
'use strict'

import rethinkdb from 'rethinkdb'

function createQueryRunner(talbeName: string, dbName: string) {
  return function runQuery(dbConnection: any, queryFns: any, thenFn?: Function) {
    let query = rethinkdb
    .db(dbName || 'test')
    .table(talbeName)

    for (let fn in queryFns) {
      let args = queryFns[fn]
      if (args && isNaN(args.length)) args = [args]
      query = query[fn].apply(query, args)
    }
    let result = query.run(dbConnection)

    if (thenFn) return result.then(thenFn)
    else return result
  }
}

export { createQueryRunner }
