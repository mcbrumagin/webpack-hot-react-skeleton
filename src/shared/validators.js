/* @flow */
'use strict'

function isEmail(val: string) {
  // This is naive validation
  return /\S+@\S+\.\S+/.test(val)
}

export {
  isEmail
}
