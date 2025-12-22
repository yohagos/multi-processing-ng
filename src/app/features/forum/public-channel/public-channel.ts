import { Component, inject } from '@angular/core';
import { ForumService } from '../services/forum-service';
import { TextEditor } from '../text-editor/text-editor';

@Component({
  selector: 'app-public-channel',
  imports: [
    TextEditor,
  ],
  templateUrl: './public-channel.html',
  styleUrl: './public-channel.scss',
})
export class PublicChannel {
  private forumService = inject(ForumService)
  publicMessages = this.forumService.messagesPublicChannel

  constructor() {
    this.forumService.loadPublicChannelMessages()
  }
}
