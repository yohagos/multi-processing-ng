import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ForumLoginService } from '../services/forum-login-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-forum-login',
  imports: [
    ReactiveFormsModule,

    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './forum-login.html',
  styleUrl: './forum-login.scss',
})
export class ForumLogin {
  private dialogRef = inject(MatDialogRef)
  private fb = inject(FormBuilder)
  private router = inject(Router)
  private forumLoginService = inject(ForumLoginService)

  loading = signal<boolean>(false)

  form = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  })

  onSubmit() {
    const email = this.form.get('email')?.value
    const username = this.form.get('username')?.value
    if (email !== "" && username !== "") {
        this.loading.set(true)
        this.forumLoginService.loginToForum(email!, username!).subscribe({
          next: () => this.loading.set(false)
        })
        this.dialogRef.close()
        this.router.navigate(['forum/public'])
    }
  }

  onCancel() {
    this.form.reset()
    this.forumLoginService.logoutForumUser()
    this.router.navigate([''])
    this.dialogRef.close()
  }
}
