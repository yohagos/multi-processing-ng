import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ForumChannelApi, ForumChannelMessagesApi, ForumChannelUi, ForumMessageApi, ForumMessageUi } from '../models/forum.models';
import { catchError, of } from 'rxjs';
import { ForumAdapterService } from './forum-adapter-service';
import { ForumLoginService } from './forum-login-service';
import { ForumMessageService } from './forum-message-service';
import { ForumChannelService } from './forum-channel-service';
import { ForumUserService } from './forum-user-service';
import { ConfirmService } from '../../../shared/services/confirm-service';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private readonly baseUrl = "http://localhost:8080/api/forum"
  private httpClient = inject(HttpClient)

  private forumAdapterService = inject(ForumAdapterService)
  private forumLoginService = inject(ForumLoginService)
  private forumMessageService = inject(ForumMessageService)
  private forumChannelService = inject(ForumChannelService)
  private forumUserService = inject(ForumUserService)

  private confirmService = inject(ConfirmService)

  messagesPublicChannel = signal<ForumChannelMessagesApi | undefined>(undefined)

  markedMessageAsParentMsg = signal<ForumMessageUi | undefined>(undefined)

  userChannels = signal<ForumChannelUi[]>([])

  channelMessages = signal<ForumMessageUi[]>([])

  loadPublicChannelMessages() {
    return this.httpClient.get<ForumChannelMessagesApi>(`${this.baseUrl}/channels/public`)
      .pipe(
        catchError((err) => of(err))
      )
      .subscribe({
        next: (result) => {
          this.messagesPublicChannel.set(this.forumAdapterService.toForumChannelMessagesUi(result))
        }
      })
  }

  sendPublicMessage(
    msg: string
  ) {
    const channelID = this.messagesPublicChannel()?.channel.id
    const userID = this.forumLoginService.getCurrentForumUser()?.id

    if (channelID == undefined || userID == undefined) return

    this.httpClient.post(`${this.baseUrl}/channels/${channelID}/messages`, {user_id: userID, content: msg, parent_message_id: this.markedMessageAsParentMsg()?.id})
      .pipe(
        catchError((err) => {
          console.error("Send Message Error => ",err)
          return of(err)
        })
      )
      .subscribe({
        next: (result) => {
          this.loadPublicChannelMessages()
        }
      })
  }

  sendMessageByChannelID(
    channelID: string,
    msg: string,
  ) {
    const userID = this.forumLoginService.getCurrentForumUser()?.id
    const pmID = this.markedMessageAsParentMsg()?.id
    if (!userID || !channelID || !msg) return
    this.httpClient.post(`${this.baseUrl}/channels/${channelID}/messages`, {
      user_id: userID, content: msg, parent_message_id: pmID,
    }).pipe(
      catchError((err) => {
        console.error(err)
        return of(err)
      })
    )
      .subscribe({
        next: () => this.loadChannelMessagesByID(channelID)
      })
  }

  loadUserChannels() {
    const userID = this.forumLoginService.getCurrentForumUser()?.id
    if (!userID) return
    this.httpClient.get<ForumChannelApi[]>(`${this.baseUrl}/channels/user/${userID}`)
          .pipe(
            catchError((err) => {
              console.error(err)
              return of(err)
            })
          )
          .subscribe({
            next: (response) => {
              response === null ? this.userChannels.set([]) : this.userChannels.set(this.forumAdapterService.toForumChannelUiList(response))
            }
          })
  }

  getOrCreateUserChannel(user2ID: string | undefined) {
    const user1ID = this.forumLoginService.getCurrentForumUser()?.id
    if (!user1ID || !user2ID || user1ID === user2ID) return
    const params = new HttpParams()
            .set('user1ID', user1ID)
            .set('user2ID', user2ID)
    this.httpClient.get<string>(`${this.baseUrl}/channels/direct`, {params, observe: 'response'})
          .pipe(
            catchError((err) => of(err)),
          )
          .subscribe({})
  }

  loadChannelMessagesByID(channelID: string) {
    if (!channelID) return

    const userID = this.forumLoginService.forumUser()?.id
    if (!channelID || !userID) return
    this.channelMessages.set([])
    const params = new HttpParams().set('userID', userID)
    this.httpClient.get<ForumMessageApi[]>(`${this.baseUrl}/channels/${channelID}/messages`, {params, observe: 'response'})
          .pipe(
            catchError((err) => of(err))
          )
          .subscribe({
            next: (response: HttpResponse<ForumMessageApi[]>) => {
              if (!response || !response.body) return
              this.channelMessages.set(this.forumAdapterService.toForumMessageUiList(response.body))
            },
            error: () => this.channelMessages.set([]),
          })
  }

  markMessageAsParent(msg: ForumMessageUi | undefined) {
    this.markedMessageAsParentMsg.set(msg)
  }

  deleteMessageById(msg_id: string | undefined, user_id: string | undefined) {
    this.confirmService.confirmAction('Are you sure you want to delete that message?')
          .subscribe((result) => {
            if (result && user_id) {
              const params = new HttpParams()
                  .set('user_id', user_id)
              this.httpClient.delete(`${this.baseUrl}/messages/${msg_id}`, {params, observe: 'response'})
                  .pipe(
                    catchError((err) => of(err))
                  )
                  .subscribe({
                    next: () => this.loadPublicChannelMessages()
                  })
            }
          })
  }
}
