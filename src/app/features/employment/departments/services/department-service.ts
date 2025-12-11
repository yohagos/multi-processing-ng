import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { DepartmentAdapter } from './department-adapter';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DepartmentApiData, DepartmentPage } from '../../models/department.model';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private departmentAdapterService = inject(DepartmentAdapter)
  private httpClient = inject(HttpClient)
  private baseUrl = 'http://localhost:8080/api/department'

  departmentList: WritableSignal<DepartmentPage> = signal({
    data: [],
    total: 0,
    error: null
  })

  loadDepatments() {
    this.httpClient.get<DepartmentApiData[]>(this.baseUrl).pipe(
      catchError((err) => {
        console.error(err)
        return of(err)
      })
    ).subscribe({
      next: (result) => {
        this.departmentList.set({
          data: this.departmentAdapterService.toDepartmentUiList(result.data),
          total: result.total,
          error: result.error
        })
      }
    })
  }

  loadDepartmentsWithFilter(searchName: string) {
    const params = new HttpParams()
        .set('searchName', searchName)
    this.httpClient.get(this.baseUrl, {params, observe: 'response'}).pipe(
      catchError((err) => {
        return of(err)
      })
    ).subscribe({
      next: (result) => {
        this.departmentList.set({
          data: (result.body as DepartmentPage).data,
          total: (result.body as DepartmentPage).total,
          error: (result.body as DepartmentPage).error,
        })
      }
    })
  }

  updateDepartment(dep: DepartmentApiData): Observable<void> {
    if (dep == undefined) {
      return this.createDepartment(dep)
    }
    return this.httpClient.patch(`${this.baseUrl}/${dep.id}`, dep).pipe(
      catchError((err) => of(err))
    )
  }

  createDepartment(dep: Partial<DepartmentApiData>): Observable<void> {
    return this.httpClient.post(this.baseUrl, dep).pipe(
      catchError((err) => of(err)),
    )
  }
}
