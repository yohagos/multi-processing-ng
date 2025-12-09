import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import {
  UserApiData,
  UserApiDataWithDetails,
  UserCreateResponse,
  UserPage,
  UserUiDataWithDetails,
} from '../../models/user.model';
import { catchError, forkJoin, Observable, of, tap, throwError } from 'rxjs';
import { UserAdapter } from './user-adapter';
import { DepartmentService } from '../../departments/services/department-service';
import { AddressService } from '../../address/services/address-service';
import { PositionService } from '../../positions/services/position-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userAdapterService = inject(UserAdapter);
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/user';

  private departmentService = inject(DepartmentService);
  private positionService = inject(PositionService)
  private addressService = inject(AddressService);

  public userPage: WritableSignal<UserPage> = signal({
    data: [],
    total: 0,
    error: null,
  });

  public selectedUser: WritableSignal<UserUiDataWithDetails | undefined> = signal(undefined);

  public isListLoading: WritableSignal<boolean> = signal(false);
  public isDetailLoading: WritableSignal<boolean> = signal(false);
  public error: WritableSignal<any | null> = signal(null);

  public getUsers(page: number, limit: number) {
    this.isListLoading.set(true);
    this.error.set(null);
    const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());

    this.http.get(this.baseUrl, { params, observe: 'response' }).subscribe({
      next: (response) => {
        this.userPage.set({
          data: (response.body as UserPage).data,
          total: (response.body as UserPage).total,
          error: (response.body as UserPage).error,
        });
      },
      error: (err) => {
        this.userPage.set({
          data: [],
          total: 0,
          error: err,
        });
      },
    });
  }

  getUsersWithFilter(
    page: number,
    limit: number,
    searchName: string,
    departmentName: string,
  ) {
    const params = new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString())
        .set('searchName', searchName)
        .set('departmentName', departmentName)

    this.http.get(this.baseUrl,  {params, observe: 'response'})
        .pipe(
          catchError((err) => {
            console.error(err)
            return of(err)
          })
        ).subscribe({
          next: (response) => {
            console.log(response.body)
            this.userPage.set({
              data: (response.body as UserPage).data,
              total: (response.body as UserPage).total,
              error: (response.body as UserPage).error,
            })
          }
        })
  }

  public getUserById(id: string) {
    this.isDetailLoading.set(true);
    this.error.set(null);

    this.http
      .get<UserUiDataWithDetails>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError((err) => {
          this.error.set(err);
          this.isDetailLoading.set(false);
          this.selectedUser.set(undefined);
          return of(null);
        })
      )
      .subscribe((item) => {
        console.log('Detail user received => ', item);
        if (item) {
          this.selectedUser.set(this.userAdapterService.toUiDataWithDetails(item));
        }
        this.isDetailLoading.set(false);
      });
  }

  public createUser(newUser: Partial<UserUiDataWithDetails>): Observable<UserCreateResponse> {
    this.error.set(null);
    return this.http.post<UserCreateResponse>(this.baseUrl, newUser).pipe(
      catchError((err) => {
        this.error.set(err);
        return throwError(() => err);
      })
    );
  }

  updateAllUserData(userData: UserApiDataWithDetails, originalData: UserApiDataWithDetails) {
    const user: UserApiData = {
      id: userData.id,
      first_name: userData.first_name,
      last_name: userData.last_name,
      date_of_birth: userData.date_of_birth,
      department_id: userData.department_id,
      email: userData.email,
      hire_date: userData.hire_date,
      phone: userData.phone,
      position_id: userData.position_id
    }

    const originalUser = {
      id: originalData.id,
      first_name: originalData.first_name,
      last_name: originalData.last_name,
      date_of_birth: originalData.date_of_birth,
      department_id: originalData.department_id,
      email: originalData.email,
      hire_date: originalData.hire_date,
      phone: originalData.phone,
      position_id: originalData.position_id
    }

    const updates$: Observable<any>[] = []

    if (JSON.stringify(user) !== JSON.stringify(originalUser)) {
      updates$.push(this.updateUser(user))
    }

    if (userData.address && JSON.stringify(userData.address) !== JSON.stringify(originalData.address)) {
      updates$.push(this.addressService.updateAddress(userData.address))
    }

    if (userData.department && JSON.stringify(userData.department) !== JSON.stringify(originalData.department)) {
      updates$.push(this.departmentService.updateDepartment(userData.department))
    }

    if (userData.position && JSON.stringify(userData.position) !== JSON.stringify(originalData.position)) {
      updates$.push(this.positionService.updatePosition(userData.position))
    }

    return forkJoin(updates$).pipe(
      tap(() => {
        this.getUsers(1, 10)
        this.getUserById(userData.id)
      }),
      catchError((err) => {
        console.error("Update fields failed: ", err)
        return of(err)
      })
    ).subscribe()
  }

  updateUser(user: UserApiData) {
    return this.http.patch(`${this.baseUrl}/${user.id}`, user).pipe(
      catchError((err) => of(err))
    )
  }

  public deleteUserById(id: string): Observable<void> {
    this.error.set(null);

    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        this.userPage.update((page) => ({
          ...page,
          data: page.data.filter((item) => item.id !== id),
        }));
        if (this.selectedUser()?.id === id) {
          this.selectedUser.set(undefined);
        }
      }),
      catchError((err) => {
        this.error.set(err);
        return of(err);
      })
    );
  }
}
