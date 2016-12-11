/* @flow */
'use strict'

function registerSocketListeners(socket: any /* TODO? */, listenerMap: any /* TODO? */) {
  for (let eventName in listenerMap) {
    let handler = listenerMap[eventName]
    let listener = socket.on(eventName, handler)
  }

  socket.on('disconnect', () => {
    for (let eventName in listenerMap) {
      let handler = listenerMap[eventName]
      socket.removeListener(eventName, handler)
    }
  })
}

function createSocketEventEmitter(socket: any /* TODO? */, entityName: string) {
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

export {
  registerSocketListeners,
  createSocketEventEmitter
}
