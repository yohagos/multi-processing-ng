import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ForumLoginService } from '../services/forum-login-service';
import { Router, RouterOutlet } from '@angular/router';
import { ForumService } from '../services/forum-service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ForumLogin } from '../forum-login/forum-login';

interface ForumRoutes {
  path: string
  name: string
}

@Component({
  selector: 'app-forum-toolbar',
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,

    RouterOutlet,
  ],
  templateUrl: './forum-toolbar.html',
  styleUrl: './forum-toolbar.scss',
})
export class ForumToolbar implements OnInit {
  private forumLoginService = inject(ForumLoginService)
  private forumService = inject(ForumService)
  private router = inject(Router)
  private dialog = inject(MatDialog)

  @ViewChild('fDrawer') fDrawer!: MatDrawer

  forumRoutes: ForumRoutes[] = [
    {
      path: 'forum',
      name: 'Public Channel',
    },
  ]

  constructor() {
    const userData = this.forumLoginService.getCurrentForumUser()
    if (!userData) {
      this.openLoginDialog()
    }
    this.router.navigate(['forum/public'])
  }

  ngOnInit(): void {
    this.forumService.loadUserChannels()
  }

  openLoginDialog() {
      this.dialog.open(ForumLogin, {
        width: "30em",
        disableClose: true,
      })
    }

  isUserLoggedIn() {
    return this.forumLoginService.getCurrentForumUser() !== null
  }

  clearStorage() {
    this.forumLoginService.logoutForumUser()
    this.router.navigate([''])
  }

  /*
  TODO
  -> Toolbar/Drawer for messages / channels
  -> generally Public chat will be directly on the forum component
  -> before entering, user needs to register/login with username and email
  -> generated adapter and general service, need to implement the services
  */

}
