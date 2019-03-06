import { Component, State } from '@stencil/core'
import io from 'socket.io-client'

@Component({
  tag: 'funny-chat',
  styleUrl: 'funny-chat.css',
  shadow: true
})
export class FunnyChat {
  socket: any
  inputValue: string
  currentUser: any

  @State() messages: any[] = []

  componentDidLoad() {
    this.establishSocket()
    this.registerUser()
    this.monitorEvents()
  }

  establishSocket() {
    this.socket = io('http://localhost:3000')
  }

  handleSubmit(event: Event) {
    event.preventDefault()
  }

  handleInput(event) {
    return (this.inputValue = event.target.value)
  }

  clearInput() {
    this.inputValue = ''
  }

  monitorEvents() {
    this.socket.on('client_notification', data => {
      this.displayNotification(data)
    })
  }

  displayNotification({ text }) {
    this.messages = [...this.messages, text]
  }

  registerUser() {
    this.currentUser = { ...this.currentUser, nickName: 'toto' }
    this.socket.emit('new_client', this.currentUser.nickName)
  }

  render() {
    return (
      <main>
        <ul id='messages'>
          {this.messages && this.messages.map(message => <li>{message}</li>)}
        </ul>
        <form onSubmit={event => this.handleSubmit(event)}>
          <input
            autocomplete='off'
            onInput={event => this.handleInput(event)}
          />
          <button>Send</button>
        </form>
      </main>
    )
  }
}
