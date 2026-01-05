import { AfterViewInit, Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ForumService } from '../services/forum-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumLoginService } from '../services/forum-login-service';
import { ForumMessageUi } from '../models/forum.models';
import { Messages } from '../messages/messages';
import { TextEditor } from '../text-editor/text-editor';

@Component({
  selector: 'app-direct-channel',
  imports: [

    Messages,
    TextEditor,
  ],
  templateUrl: './direct-channel.html',
  styleUrl: './direct-channel.scss',
})
export class DirectChannel implements OnInit, AfterViewInit {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef
  shouldScrollToBottom = true
  private forumService = inject(ForumService)
  private forumLoginService = inject(ForumLoginService)
  private router = inject(Router)
  private routes = inject(ActivatedRoute)

  channelId: string | undefined

  loggedInUser = this.forumLoginService.forumUser

  messages = this.forumService.channelMessages

  selectedParentMessageId: string | null = null

  constructor() {
    const id = this.routes.snapshot.params['id']
    if (!id) this.router.navigate(['forum/public'])
    this.channelId = id
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom()
    }
  }

  sendMessageToChannel() {}

  scrollToBottom() {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight
    } catch (err) {
      console.error(err)
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

  undoMarkMessageAsParent() {
    this.forumService.markMessageAsParent(undefined)
  }
}
