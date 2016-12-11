/* @flow */
'use strict'

import React from 'react'

import './main.css'
import { isEmail } from '../shared/validators'

export default class App extends React.Component {

  state: {
    emails: Array<{ id: string, email: string }>,
    form: { id?: string, email: string }
  }

  constructor(props: any) {
    super(props)

    this.state = {
      emails: [],
      form: { email: '' }
    }

    window.socket.on('email:insert', (email) => {
      this.state.emails.push(email)
      this.setState(this.state)
    })
  }

  renderEmailList() {
    return <ul>
      {
        this.state.emails.map((email) =>
          <li key={email.id}>{email.email}</li>
        )
      }
    </ul>
  }

  createFormSetter(name: string) {
    return (event: typeof(event)) => {
      this.state.form[name] = this.refs[name].value
      this.setState(this.state)
    }
  }

  submitForm(event: typeof(event)) {
    event.preventDefault()
    const form = this.state.form

    if (!isEmail(form.email))
      throw new Error('Invalid email')

    //axios.post('/validation-test', form)
    //  .then((res) => console.log(res))

    window.socket.emit('email:client:insert', form)
  }

  render() {
    return <div className="content">
      <h1>Hello</h1>
      <form onSubmit={this.submitForm.bind(this)}>
        <div className="labeled-input">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" ref="email"
            value={this.state.form.email}
            onChange={this.createFormSetter.bind(this)('email')} />
        </div>
      </form>
      {this.renderEmailList.call(this)}
    </div>
  }
}
