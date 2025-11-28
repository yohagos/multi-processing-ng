import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { PositionAdapter } from './position-adapter';
import { HttpClient } from '@angular/common/http';
import { PositionApiData, PositionPage } from '../../models/position.model';
import { catchError, of } from 'rxjs';
import { DepartmentApiData } from '../../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private positionAdapterService = inject(PositionAdapter)
  private httpClient = inject(HttpClient)
  private baseUrl = 'http://localhost:8080/api/position'

  positionsList: WritableSignal<PositionPage> = signal({
    data: [],
    total: 0,
    error: null
  })

  loadPositionList() {
    this.httpClient.get(this.baseUrl).pipe(
      catchError((err) => {
        console.error(err)
        return of(err)
      })
    ).subscribe({
      next: (data) => {
        const res = this.positionAdapterService.toUiList(data.data)

        this.positionsList.set({
          data: res,
          total: data.total,
          error: data.error
        })
      }
    })
  }

  updatePosition(pos: PositionApiData) {}
}
