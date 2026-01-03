import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ForumService } from '../services/forum-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumLoginService } from '../services/forum-login-service';
import { ForumMessageUi } from '../models/forum.models';
import { Messages } from '../messages/messages';

@Component({
  selector: 'app-direct-channel',
  imports: [
    Messages
  ],
  templateUrl: './direct-channel.html',
  styleUrl: './direct-channel.scss',
})
export class DirectChannel implements OnInit {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef
  private forumService = inject(ForumService)
  private forumLoginService = inject(ForumLoginService)
  private router = inject(Router)
  private routes = inject(ActivatedRoute)

  loggedInUser = this.forumLoginService.forumUser

  messages = signal<ForumMessageUi[] | undefined>([])

  selectedParentMessageId: string | null = null

  constructor() {
    const id = this.routes.snapshot.params['id']
    if (!id) this.router.navigate(['forum/public'])

  }

  ngOnInit(): void {

  }

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

  undoMarkMessageAsParent(message: ForumMessageUi) {
    this.forumService.markMessageAsParent(undefined)
  }
}
