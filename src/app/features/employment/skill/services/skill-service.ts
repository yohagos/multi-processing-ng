import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { SkillAdapter } from './skill-adapter';
import { HttpClient, HttpParams } from '@angular/common/http';

import { catchError, of, tap } from 'rxjs';
import { SkillPage, SkillWithDetailsApiData, SkillWithDetailsUiData } from '../../models/skill.model';
import { UserService } from '../../users/services/user-service';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private skillAdapterService = inject(SkillAdapter)
  private httpClient = inject(HttpClient)
  private baseUrl = "http://localhost:8080/api/skill"

  private userService = inject(UserService)

  public skillsByUserId: WritableSignal<SkillWithDetailsUiData[] | null> = signal(null)
  skillList: WritableSignal<SkillPage> = signal({
    data: [],
    total: 0,
    error: null
  })

  getSkillsByUserId(id: string) {
    this.httpClient.get<SkillWithDetailsApiData[]>(`${this.baseUrl}/user/${id}`).pipe(
      catchError((err) => {
        return of(null)
      })
    ).subscribe({
      next: (result) => {
        this.skillsByUserId.set(result)
      }
    })
  }

  loadSkills() {
    this.httpClient.get(this.baseUrl).pipe(
      catchError((err) => {
        return of(err)
      })
    ).subscribe({
      next: (result) => this.skillList.set({
        data: result.data,
        total: result.total,
        error: result.error
      })
    })
  }

  addSkillForUser(
    skill_id: string,
    user_id: string,
  ) {
    this.httpClient.post(`${this.baseUrl}/add/${user_id}/skill/${skill_id}`,{}).pipe(
      tap(() => {
        this.userService.getUsers(1, 10)
      }),
      catchError((err) => {
        console.error(err)
        return of(err)
      })
    ).subscribe()
  }

  removeSkillForUser(
    skill_id: string,
    user_id: string,
  ) {
    this.httpClient.delete(`${this.baseUrl}/delete/${user_id}/skill/${skill_id}`).pipe(
      tap(() => {
        this.userService.getUsers(1, 10)
      }),
      catchError((err) => {
        return of(err)
      })
    ).subscribe()
  }

}
