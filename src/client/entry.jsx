/* @flow */
'use strict'

import React from 'react'
import { render } from 'react-dom'
import App from './main'
import axios from 'axios'
import io from 'socket.io-client'

window.axios = axios
window.socket = io()

render(<App/>, document.getElementById('app'))
