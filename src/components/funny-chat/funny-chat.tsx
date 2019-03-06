import { Component, State } from '@stencil/core'
import io from 'socket.io-client'
import toastr from 'toastr'

enum TOAST {
  INFO,
  ERROR
}

@Component({
  tag: 'funny-chat',
  styleUrl: 'funny-chat.scss',
  shadow: false
})
export class FunnyChat {
  socket: any
  inputValue: string
  currentUser: any

  @State() messages: any[] = []

  componentWillLoad() {
    this.establishSocket()
    this.registerUser()
    this.monitorEvents()
    this.emitEvents()
  }

  establishSocket() {
    this.socket = io('http://localhost:3000')
  }

  emitEvents() {
    this.socket.emit('user joined')
  }

  monitorEvents() {
    this.socket.on('chat message', message => {
      this.populateMessages(message)
    })

    this.socket.on('user joined', () => {
      this.notifyService('User has joined!', TOAST.INFO)
    })

    this.socket.on('disconnect', () => {
      this.notifyService('User has left!', TOAST.ERROR)
    })
  }

  handleSubmit(event: Event) {
    event.preventDefault()

    this.socket.emit('chat message', this.inputValue)
  }

  handleInput(event) {
    return (this.inputValue = event.target.value)
  }

  clearInput() {
    this.inputValue = ''
  }

  populateMessages(message) {
    this.messages = [...this.messages, message]
  }

  registerUser() {
    this.currentUser = { ...this.currentUser, nickName: 'toto' }
    this.socket.emit('new_client', this.currentUser.nickName)
  }

  notifyService(message: string, type: TOAST) {
    return {
      0() {
        toastr.info(message, 'WOOOAH!')
      },
      1() {
        toastr.error(message, 'OHH :(')
      }
    }[type]()
  }

  render() {
    return (
      <main>
        <div id='wrapper'>
          <div class='window'>
            <div class='windowrap'>
              <div class='bot'>
                <h3>MESSENGER</h3>
              </div>
              <div class='chatwindow'>
                {this.messages &&
                  this.messages.map(message => (
                    <div class='left'>{message}</div>
                  ))}
              </div>
              <form
                id='messenger'
                name='messenger'
                onSubmit={event => this.handleSubmit(event)}
              >
                <input
                  type='text'
                  name='enter'
                  class='enter'
                  value=''
                  placeholder='say something...'
                  id='message'
                  onInput={event => this.handleInput(event)}
                />
                <div class='send'>
                  <input type='submit' value='' id='btn' tabindex='-1' />
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    )
  }
}
