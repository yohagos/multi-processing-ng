import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ForumLoginService } from '../services/forum-login-service';
import { Router, RouterOutlet } from '@angular/router';
import { ForumService } from '../services/forum-service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ForumLogin } from '../forum-login/forum-login';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { Subject, takeUntil } from 'rxjs';
import { NamesFormatterPipe } from '../../../core/pipes/names-formatter-pipe';

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
    NamesFormatterPipe,
  ],
  templateUrl: './forum-toolbar.html',
  styleUrl: './forum-toolbar.scss',
})
export class ForumToolbar implements OnInit, OnDestroy {
  private forumLoginService = inject(ForumLoginService)
  private forumService = inject(ForumService)
  private router = inject(Router)
  private dialog = inject(MatDialog)

  @ViewChild('fDrawer') fDrawer!: MatDrawer

  forumRoutes: ForumRoutes[] = [
    {
      path: 'public',
      name: 'Public Channel',
    },
  ]

  destroy$ = new Subject<void>()

  userChannels = this.forumService.userChannels

  constructor() {
    const userData = this.forumLoginService.getCurrentForumUser()
    if (!userData) {
      this.openLoginDialog()
    }
    // this.router.navigate(['forum/public'])
    this.router.navigate(['forum/channels'])

    toObservable(this.userChannels)
      .pipe(takeUntil(this.destroy$))
      .subscribe((channels) => {
        if (!channels) return
        channels.map(ch => {
          this.forumRoutes.push({
            name: ch.name,
            path: ch.id || ''
          })
          console.log(this.forumRoutes)
        })
      })
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

  navigateToChannel(path: string) {
    if (path !== 'public') this.forumService.loadChannelMessagesByID(path)
    this.router.navigate([`forum/${path}`])
  }

  clearStorage() {
    this.forumLoginService.logoutForumUser()
    this.router.navigate([''])
    this.forumRoutes.filter(r => r.path === 'public')
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  /*
  TODO
  -> Toolbar/Drawer for messages / channels
  -> generally Public chat will be directly on the forum component
  -> before entering, user needs to register/login with username and email
  -> generated adapter and general service, need to implement the services
  */

}
