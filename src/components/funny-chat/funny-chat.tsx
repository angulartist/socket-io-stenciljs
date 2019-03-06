import { Component, State } from '@stencil/core'
import io from 'socket.io-client'
import toastr from 'toastr'

enum TOAST {
  INFO,
  ERROR
}

@Component({
  tag: 'funny-chat',
  styleUrl: 'funny-chat.scss'
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
    this.socket.on('chat message', (content, senderId) => {
      this.populateMessages(content, senderId)
    })

    this.socket.on('user joined', () => {
      this.notifyService('User has joined!', TOAST.INFO)
    })

    this.socket.on('disconnect', () => {
      this.notifyService('User has left!', TOAST.ERROR)
    })

    this.socket.on('welcome', id => {
      this.currentUser = { ...this.currentUser, id }
    })
  }

  handleSubmit(event: Event) {
    event.preventDefault()

    const preparedMessage = {
      content: this.inputValue,
      senderId: this.currentUserId
    }

    this.socket.emit('chat message', preparedMessage)
  }

  handleInput(event) {
    return (this.inputValue = event.target.value)
  }

  clearInput() {
    this.inputValue = ''
  }

  populateMessages(content, senderId) {
    const newMessage = {
      content,
      senderId
    }
    this.messages = [...this.messages, newMessage]
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

  isCurrentUserTheSender(senderId): boolean {
    return this.currentUserId === senderId
  }

  get currentUserId(): string {
    if (this.currentUser) return this.currentUser.id
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
                  this.messages.map(({ content, senderId }) =>
                    this.isCurrentUserTheSender(senderId) ? (
                      <div class='right'>
                        {content} - {senderId}
                      </div>
                    ) : (
                      <div class='left'>
                        {content} - {senderId}
                      </div>
                    )
                  )}
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
