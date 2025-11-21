import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { SkillAdapter } from './skill-adapter';
import { HttpClient } from '@angular/common/http';

import { catchError, of } from 'rxjs';
import { SkillWithDetailsUiData } from '../../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private skillAdapterService = inject(SkillAdapter)
  private httpClient = inject(HttpClient)
  private baseUrl = "http://localhost:8080/api/skill"

  public skillsByUserId: WritableSignal<SkillWithDetailsUiData[] | null> = signal(null)

  getSkillsByUserId(id: string) {
    //console.log("Calling Backend for Skills by User ID")
    this.httpClient.get<SkillWithDetailsUiData[]>(`${this.baseUrl}/user/${id}`).pipe(
      catchError((err) => {
        //console.error(err)
        return of(null)
      })
    ).subscribe({
      next: (result) => {
        //console.log(`SkillService | results by user id ${id} => `, result)
        this.skillsByUserId.set(result)

        result?.forEach((s) => {
          console.log(s)
          console.log(typeof s.proficiency_level)
        })
      }
    })
  }
}
