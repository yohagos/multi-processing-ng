import { Component, inject, OnDestroy, signal } from '@angular/core';
import { ForumService } from '../services/forum-service';
import { TextEditor } from '../text-editor/text-editor';
import { Messages } from '../messages/messages';
import { ForumLoginService } from '../services/forum-login-service';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-public-channel',
  imports: [
    TextEditor,
    Messages,
  ],
  templateUrl: './public-channel.html',
  styleUrl: './public-channel.scss',
})
export class PublicChannel {
  private forumService = inject(ForumService)
  private forumLoginService = inject(ForumLoginService)
  publicMessages = this.forumService.messagesPublicChannel

  loggedInUser = this.forumLoginService.forumUser

  constructor() {
    this.forumService.loadPublicChannelMessages()
  }
}
