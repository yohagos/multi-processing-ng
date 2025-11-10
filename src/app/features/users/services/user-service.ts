import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { UserModel, UserPage, UserUiData } from '../user.model';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { UserAdapter } from './user-adapter';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userAdapterService = inject(UserAdapter);
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/user';

  public userPage: WritableSignal<UserPage> = signal({
    data: [],
    total: 0,
    error: null,
  });

  public selectedUser: WritableSignal<UserUiData | undefined> = signal(undefined);

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
          data: (response.body as UserPage).data.map((item) => this.userAdapterService.toUi(item)),
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
      .get<UserModel>(`${this.baseUrl}/${id}`)
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
          this.selectedUser.set(this.userAdapterService.toUi(item));
        }
        this.isDetailLoading.set(false);
      });
  }

  public createUser(newUser: Partial<UserModel>): Observable<UserModel> {
    this.error.set(null);
    return this.http.post<UserModel>(this.baseUrl, newUser).pipe(
      tap((createdUser) => {
        this.userPage.update((page) => ({
          ...page,
          data: [this.userAdapterService.toUi(createdUser), ...page.data].slice(0, 9),
        }));
      }),
      catchError((err) => {
        this.error.set(err);
        return throwError(() => err);
      })
    );
  }

  public updateUser(id: string, update: Partial<UserModel>): Observable<UserModel> {
    this.error.set(null);

    return this.http.patch<UserModel>(`${this.baseUrl}/${id}`, update).pipe(
      tap((updatedUser) => {
        if (this.selectedUser()?.id === id) {
          this.selectedUser.set(this.userAdapterService.toUi(updatedUser));
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
