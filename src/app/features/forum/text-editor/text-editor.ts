import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ForumService } from '../services/forum-service';

@Component({
  selector: 'app-text-editor',
  imports: [
    ReactiveFormsModule,

    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,

  ],
  templateUrl: './text-editor.html',
  styleUrl: './text-editor.scss',
})
export class TextEditor {
  private forumService = inject(ForumService)

  private fb = inject(FormBuilder)
  message = this.fb.control('', [Validators.required])

  sendMessage() {
    if (!this.message.valid || this.message.value === null) return

    this.forumService.sendMessage(this.message.value)
    this.message.reset()
  }
}
