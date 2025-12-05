import { inject, Injectable } from '@angular/core';
import { AddressAdapter } from './address-adapter';
import { HttpClient } from '@angular/common/http';
import { AddressApiData } from '../../models/address.model';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private addressAdapterService = inject(AddressAdapter)
  private httpClient = inject(HttpClient)
  private baseUrl = 'http://localhost:8080/api/address'

  updateAddress(add: AddressApiData): Observable<void> {
    if (add.id === undefined) {
      return this.createAddress(add)
    }
    return this.httpClient.patch(`${this.baseUrl}/${add.id}`, add).pipe(
      catchError((err) => of(err))
    )
  }

  createAddress(add: AddressApiData): Observable<void> {
    return this.httpClient.post(this.baseUrl, add).pipe(
      catchError((err) => of(err))
    )
  }
}
