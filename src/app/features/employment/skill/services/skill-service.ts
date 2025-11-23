import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { SkillAdapter } from './skill-adapter';
import { HttpClient } from '@angular/common/http';

import { catchError, of } from 'rxjs';
import { SkillWithDetailsApiData, SkillWithDetailsUiData } from '../../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private skillAdapterService = inject(SkillAdapter)
  private httpClient = inject(HttpClient)
  private baseUrl = "http://localhost:8080/api/skill"

  public skillsByUserId: WritableSignal<SkillWithDetailsUiData[] | null> = signal(null)

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
}
