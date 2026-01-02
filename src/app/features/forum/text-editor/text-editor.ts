import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ForumService } from '../services/forum-service';
import { ForumLoginService } from '../services/forum-login-service';
import { AbbreviateTextsPipe } from '../../../core/pipes/abbreviate-texts-pipe';
import { ForumMessageUi } from '../models/forum.models';

@Component({
  selector: 'app-text-editor',
  imports: [
    ReactiveFormsModule,

    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,

    AbbreviateTextsPipe,
  ],
  templateUrl: './text-editor.html',
  styleUrl: './text-editor.scss',
})
export class TextEditor implements OnInit {
  private forumService = inject(ForumService)
  private forumLoginService = inject(ForumLoginService)

  parentMessage = this.forumService.markedMessageAsParentMsg
  currentUser = this.forumLoginService.forumUser

  @Output() clearMarkAsParent = new EventEmitter<ForumMessageUi>()

  private fb = inject(FormBuilder)
  message = this.fb.control('', [Validators.required])

  ngOnInit(): void {
    this.forumLoginService.loadForumUser()
  }

  sendMessage() {
    if (!this.message.valid || this.message.value === null) return

    this.forumService.sendMessage(this.message.value)
    if (this.parentMessage()) {
      this.clearMarkAsParent.emit(this.parentMessage())
    }
    this.message.reset()
  }

  recognizeParentUser(): string {
    return this.currentUser()?.id === this.parentMessage()?.user?.id ? 'Me' : this.parentMessage()!.user!.username
  }
}
