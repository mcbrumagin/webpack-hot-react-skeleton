/* @flow */
'use strict'

import React from 'react'
import PouchDB from 'pouchdb'

import './main.css'
import { isEmail } from '../shared/validators'


const db = new PouchDB('http://localhost:5984/test')
window.db = db

async function getEmails() {
  let emails
  try {
    emails = await db.get("emails")
  } catch (err) {
    console.log(err.message)
    let response = await db.put({
      _id: "emails", // TODO id instead of _id?
      emails: []
    })
    emails = await db.get("emails")
  }

  if (!emails) throw new Error('Failed to initialize emails')
  return emails
}

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

    //window.socket.on('email:insert', (email) => {
    //  this.state.emails.push(email)
    //  this.setState(this.state)
    //})

    getEmails().then((data) => {
      this.state.data = data
      this.state.emails = data.emails
      this.setState(this.state)
    })

    db.changes({
      since: 'now',
      live: true,
      include_docs: true
    }).on('change', (change) => {
      console.log({change})
      if (change.id === 'emails') db.get("emails").then((data) => {
        this.state.data = data
        this.state.emails = data.emails
        this.setState(this.state)
      })
    }).on('error', (err) => { console.error(err) })
  }

  renderEmailList() {
    return <ul>
      {
        this.state.emails.map((email) =>
          <li key={email}>{email}</li>
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

    //window.socket.emit('email:client:insert', form)

    this.state.data.emails.push(form.email)
    db.put(this.state.data).then((data) => {
      this.state.data = data
      this.state.emails = this.state.data.emails
      this.setState(this.state)
    })
  }

  renderHello() {
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

  renderMedia() {
    return <div className="content">
      <button>Shuffle</button>
      <button>Prev</button>
      <button>Play</button>
      <button>Next</button>
      <button>Repeat</button>
    </div>
  }

  render() {
    return renderHello.call(this)
  }
}
