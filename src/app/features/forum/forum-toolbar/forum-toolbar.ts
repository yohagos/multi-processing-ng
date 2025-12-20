import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ForumLoginService } from '../services/forum-login-service';

@Component({
  selector: 'app-forum-toolbar',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
  templateUrl: './forum-toolbar.html',
  styleUrl: './forum-toolbar.scss',
})
export class ForumToolbar {
  private forumLoginService = inject(ForumLoginService)

  isUserLoggedIn() {
    return this.forumLoginService.getCurrentForumUser() !== null 
  }

  clearStorage() {
    this.forumLoginService.logoutForumUser()
  }

  /*
  TODO
  -> Toolbar/Drawer for messages / channels
  -> generally Public chat will be directly on the forum component
  -> before entering, user needs to register/login with username and email
  -> generated adapter and general service, need to implement the services
  */

}
