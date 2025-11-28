import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import {
  UserApiData,
  UserApiDataWithDetails,
  UserPage,
  UserUiDataWithDetails,
} from '../../models/user.model';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { UserAdapter } from './user-adapter';
import { DepartmentService } from '../../departments/services/department-service';
import { AddressService } from '../../address/services/address-service';
import { DepartmentApiData } from '../../models/department.model';
import { PositionApiData } from '../../models/position.model';
import { AddressApiData } from '../../models/address.model';
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

  public createUser(newUser: Partial<UserUiDataWithDetails>): Observable<UserApiDataWithDetails> {
    this.error.set(null);
    return this.http.post<UserApiDataWithDetails>(this.baseUrl, newUser).pipe(
      tap((createdUser) => {
        /* this.userPage.update((page) => ({
          ...page,
          data: [this.userAdapterService.toUiDataWithDetails(createdUser), ...page.data].slice(0, 9),
        })); */
      }),
      catchError((err) => {
        this.error.set(err);
        return throwError(() => err);
      })
    );
  }

  /* public updateUser(id: string, update: Partial<UserModel>): Observable<UserUiDataWithDetails> {
    this.error.set(null);

    return this.http.patch<UserModel>(`${this.baseUrl}/${id}`, update).pipe(
      tap((updatedUser) => {
        if (this.selectedUser()?.id === id) {
          this.selectedUser.set(this.userAdapterService.toUiDataWithDetails(updatedUser));
        }

        this.userPage.update((page) => ({
          ...page,
          data: page.data.map((item) =>
            item.id === id ? this.userAdapterService.toUi(updatedUser) : item
          ),
        }));
      }),
      catchError((err) => {
        this.error.set(err);
        return throwError(() => err);
      })
    );
  } */

  public updateUserInformations(userData: UserUiDataWithDetails) {
    console.log('User Service | content of userwithdetailsform => ', userData);

    const user: UserApiData = {
      id: userData.id,
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      department_id: userData.department_id,
      position_id: userData.position_id,
      hire_date: userData.hire_date,
      phone: userData.phone,
      date_of_birth: userData.date_of_birth,
    }
    
    const department: DepartmentApiData = {
      id: userData.department_id,
      name: userData.department.name,
      description: userData.department.description,
    }

    const position: PositionApiData = {
      id: userData.position_id,
      title: userData.position.title,
      level: userData.position.level,
      department_id: userData.department_id,
    }

    const address: AddressApiData = {
      id: userData.address!.id,
      user_id: userData.id,
      street: userData.address!.street,
      city: userData.address!.city,
      zip_code: userData.address!.zip_code,
      country: userData.address!.country,
      is_primary: userData.address!.is_primary,
    }
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
