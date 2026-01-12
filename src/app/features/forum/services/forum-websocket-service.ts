import { computed, inject, Injectable, signal } from '@angular/core';
import { filter, Observable, Subject, timestamp } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { UserDetail } from '../../employment/users/user-detail/user-detail';
import { ForumLoginService } from './forum-login-service';

interface WebSocketMessage {
  type: string
  channel?: string
  message: any
  [key: string]: any
}

enum MessageType {
  CHAT_MESSAGE = 'CHAT_MESSAGE',
  NEW_MESSAGE = 'NEW_MESSAGE',
  USER_PRESENCE = 'USER_PRESENCE',
}

@Injectable({
  providedIn: 'root',
})
export class ForumWebsocketService {
  private forumLoginService = inject(ForumLoginService)
  private wsConnections = new Map<string, WebSocketSubject<any>>()
  private messageSubject = new Subject<WebSocketMessage>

  readonly isConnected = signal<boolean>(false)
  readonly messages = signal<WebSocketMessage[]>([])
  readonly connectionErrors = signal<string[]>([])

  readonly newMessages = computed(() => this.messages().filter(msg => msg.type === MessageType.NEW_MESSAGE))
  readonly presenceUpdates = computed(() => this.messages().filter(msg => msg.type === MessageType.USER_PRESENCE))

  connectToChannel(
    channelID: string
  ): WebSocketSubject<any> {
    const userID = this.forumLoginService.getCurrentForumUser()?.id

    const url = `ws://localhost:8080/api/forum/ws/${channelID}?userID=${userID}`

    const wsSubject = webSocket<WebSocketMessage>({
      url: url,
      openObserver: {
        next: () => {
          this.isConnected.set(true)
          console.log("Connected to channeöl => ", channelID)
        }
      },
      closeObserver: {
        next: () => {
          this.isConnected.set(false)
          console.log("Disconnected from channel => ", channelID)
        }
      }
    })

    this.wsConnections.set(channelID, wsSubject)

    wsSubject.subscribe({
      next: (message: WebSocketMessage) => this.handleMessage(message),
      error :(err) => {
        this.connectionErrors.update(errors => [...errors, err.message])
        console.error("Websocket error => ", err)
      },
      complete: () => {
        this.wsConnections.delete(channelID)
        console.log("Connection closed for channel => ", channelID)
      }
    })

    return wsSubject
  }

  private handleMessage(msg: WebSocketMessage) {
    this.messageSubject.next(msg)
    this.messages.update(messages => [...messages, msg])
  }

  sendMessage(channelID: string, message: any) {
    const connection = this.wsConnections.get(channelID)
    if (connection) {
      connection.next(message)
    }
  }

  sendChatMessage(channelID: string, content: string) {
    this.sendMessage(channelID, {
      type: MessageType.CHAT_MESSAGE,
      content: content,
      timestamp: new Date().toISOString(),
    })
  }

  disconnectFromChannel(channelID: string) {
    const connection = this.wsConnections.get(channelID)
    if (connection) {
      connection.complete()
      this.wsConnections.delete(channelID)
    }
  }

  disconnectAll() {
    this.wsConnections.forEach(conn => conn.complete())
    this.wsConnections.clear()
    this.isConnected.set(false)
  }

  getMessagesForChannel(channelID: string): Observable<WebSocketMessage> {
    return this.messageSubject.pipe(
      filter(msg => msg.channel === channelID)
    )
  }
}
