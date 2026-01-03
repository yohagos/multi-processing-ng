import { AfterViewChecked, Component, ElementRef, inject, OnDestroy, signal, ViewChild } from '@angular/core';
import { ForumService } from '../services/forum-service';
import { TextEditor } from '../text-editor/text-editor';
import { Messages } from '../messages/messages';
import { ForumLoginService } from '../services/forum-login-service';
import { toObservable } from '@angular/core/rxjs-interop';
import { ForumMessageUi, ForumUserUi } from '../models/forum.models';

@Component({
  selector: 'app-public-channel',
  imports: [
    TextEditor,
    Messages,
  ],
  templateUrl: './public-channel.html',
  styleUrl: './public-channel.scss',
})
export class PublicChannel implements AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef
  shouldScrollToBottom = true

  private forumService = inject(ForumService)
  private forumLoginService = inject(ForumLoginService)
  publicMessages = this.forumService.messagesPublicChannel

  loggedInUser = this.forumLoginService.forumUser

  selectedParentMessageId: string | null = null

  constructor() {
    this.forumService.loadPublicChannelMessages()
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom()
    }
  }

  scrollToBottom() {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight
    } catch (err) {
      console.log(err)
    }
  }

  markMessageAsParent(message: ForumMessageUi) {
    if (this.selectedParentMessageId === message.id) {
      this.selectedParentMessageId = null
      this.forumService.markMessageAsParent(undefined)
    } else {
      this.selectedParentMessageId = message.id || null
      this.forumService.markMessageAsParent(message)
    }
  }

  undoMarkMessageAsParent(message: ForumMessageUi) {
    this.forumService.markMessageAsParent(undefined)
  }

  selectDirectChannel(user: ForumUserUi) {
    this.forumService.getOrCreateUserChannel(user.id)
  }
}
