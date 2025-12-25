import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ForumChannelMessagesApi, ForumMessageApi, ForumMessageUi } from '../models/forum.models';
import { catchError, of } from 'rxjs';
import { ForumAdapterService } from './forum-adapter-service';
import { ForumLoginService } from './forum-login-service';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private readonly baseUrl = "http://localhost:8080/api/forum/channels"
  private httpClient = inject(HttpClient)

  private forumAdapterService = inject(ForumAdapterService)
  private forumLoginService = inject(ForumLoginService)

  messagesPublicChannel = signal<ForumChannelMessagesApi | undefined>(undefined)

  loadPublicChannelMessages() {
    return this.httpClient.get<ForumChannelMessagesApi>(`${this.baseUrl}/public`)
      .pipe(
        catchError((err) => of(err))
      )
      .subscribe({
        next: (result) => {
          console.log(result)
          this.messagesPublicChannel.set(this.forumAdapterService.toForumChannelMessagesUi(result))
        }
      })
  }

  sendMessage(
    msg: string
  ) {
    const channelID = this.messagesPublicChannel()?.channel.id
    const userID = this.forumLoginService.getCurrentForumUser()?.id

    if (channelID == undefined || userID == undefined) return

    this.httpClient.post(`${this.baseUrl}/${channelID}/messages`, {user_id: userID, content: msg})
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
}
