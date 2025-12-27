import { AfterViewInit, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ForumMessageUi } from '../models/forum.models';
import { FormatDateService } from '../../../shared/services/format-date-service';
import { ForumService } from '../services/forum-service';
import { ForumLoginService } from '../services/forum-login-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-messages',
  imports: [
    MatButtonModule,
    MatIconModule,
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

  markedMessageColor = '#2525ef77'

  compareCurrentUser(): string {
    return this.message!.user_id === this.currentUserID ? 'author' : 'not-author'
  }

  markMessageAsParent() {
    this.selectedAsParent.emit(this.message)
  }
}
