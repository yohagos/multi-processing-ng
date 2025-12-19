import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ForumUserApi, ForumUserUi } from '../models/forum.models';
import { tap } from 'rxjs';
import { ForumAdapterService } from './forum-adapter-service';

@Injectable({
  providedIn: 'root'
})
export class ForumLoginService {
  private readonly baseUrl = 'http://localhost:8080/api/forum/users/login'
  private httpClient = inject(HttpClient)
  private forumAdapter = inject(ForumAdapterService)

  private forumUser = signal<ForumUserUi | null>(null)

  loginToForum(
    email: string,
    username: string,
  ) {
    return this.httpClient.post<ForumUserApi>(this.baseUrl, {email, username}).pipe(
      tap(user => {
        const uiUser = this.forumAdapter.toForumUserUi(user)
        localStorage.setItem('forum_user', JSON.stringify(uiUser))
        //sessionStorage.setItem('forum_user', JSON.stringify(uiUser))
      })
    )
  }

  getCurrentForumUser(): ForumUserUi | null {
    const userData = localStorage.getItem('forum_user')
    if (userData) return JSON.parse(userData)
    return null
  }

  loadForumUser() {
    const user = this.getCurrentForumUser()
    this.forumUser.set(user)
  }

  logoutForumUser() {
    localStorage.removeItem('forum_user')
  }
}
