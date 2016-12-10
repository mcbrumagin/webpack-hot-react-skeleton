/* @flow */
'use strict'

function isNumber(val: string) {
  return Number(val) == val
}

function isAlphaText(val: string) {
  return /[a-z]/i.test(val)
}

function isEmail(val: string) {
  // This is naive validation
  return /\S+@\S+\.\S+/.test(val)
}

export {
  isNumber,
  isAlphaText,
  isEmail
}
