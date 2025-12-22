import { Component, inject } from '@angular/core';
import { ForumToolbar } from './forum-toolbar/forum-toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { ForumLogin } from './forum-login/forum-login';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ForumLoginService } from './services/forum-login-service';

@Component({
  selector: 'app-forum',
  imports: [
    ForumToolbar,
    RouterOutlet,

    MatDialogModule,
  ],
  templateUrl: './forum.html',
  styleUrl: './forum.scss',
})
export class Forum {
  private dialog = inject(MatDialog)
  private forumLoginService = inject(ForumLoginService)
  private router = inject(Router)

  constructor() {
    const userData = this.forumLoginService.getCurrentForumUser()
    if (!userData) {
      this.openLoginDialog()
    }
    this.router.navigate(['forum/public'])
  }

  openLoginDialog() {
    this.dialog.open(ForumLogin, {
      width: "30em",
      disableClose: true,
    })
  }
}
