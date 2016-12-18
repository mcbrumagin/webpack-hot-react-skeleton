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

export {
  registerSocketListeners
}
