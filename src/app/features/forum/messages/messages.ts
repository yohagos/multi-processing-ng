import { AfterViewInit, Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { ForumMessageUi, ForumUserUi } from '../models/forum.models';
import { FormatDateService } from '../../../shared/services/format-date-service';
import { ForumService } from '../services/forum-service';
import { ForumLoginService } from '../services/forum-login-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AbbreviateTextsPipe } from '../../../core/pipes/abbreviate-texts-pipe';
import { AbbreviationEnum } from '../../../core/enums/abbreviation';

@Component({
  selector: 'app-messages',
  imports: [
    MatButtonModule,
    MatIconModule,

    AbbreviateTextsPipe,
  ],
  templateUrl: './messages.html',
  styleUrl: './messages.scss',
})
export class Messages {
  private forumService = inject(ForumService)
  private forumLoginService = inject(ForumLoginService)
  formatDateService = inject(FormatDateService)

  currentUserID = this.forumLoginService.getCurrentForumUser()?.id
  currentUser = this.forumLoginService.getCurrentForumUser()

  @Input() message!: ForumMessageUi
  @Input() isSelectedAsParent = false
  @Output() selectedAsParent = new EventEmitter<ForumMessageUi>()

  @Output() directChannel = new EventEmitter<ForumUserUi>()

  markedMessageColor = '#2525ef77'

  compareCurrentUser(): string {
    return this.message!.user_id === this.currentUserID ? 'author' : 'not-author'
  }

  markMessageAsParent() {
    this.selectedAsParent.emit(this.message)
  }

  openDirectChannelToUser() {
    if (!this.message.user) return
    this.directChannel.emit(this.message.user)
  }

  deleteMessage() {
    this.forumService.deleteMessageById(this.message!.id, this.currentUserID)
  }
}
