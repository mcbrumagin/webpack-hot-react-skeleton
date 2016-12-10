/* @flow */
'use strict'

import './main.css'

import React from 'react'
import axios from 'axios'
import { isEmail } from '../shared/validators'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        email: ''
      }
    }
  }

  createFormSetter(name) {
    return (event) => {
      this.state.form[name] = event.target.value
      this.setState(this.state)
    }
  }

  submitForm(event) {
    event.preventDefault()
    const form = this.state.form

    if (!isEmail(form.email))
      throw new Error('Invalid email')

    axios.post('/validation-test', form)
      .then((res) => console.log(res))
  }

  render() {
    return <div className="content">
      <h1>{`Hello there... what's your email address?`}</h1>
      <form onSubmit={this.submitForm.bind(this)}>
        <div className="labeled-input">
          <label for="email">Email</label>
          <input type="text" name="email"
            value={this.state.form.email}
            onChange={this.createFormSetter.bind(this)('email')} />
        </div>
      </form>
    </div>
  }
}
