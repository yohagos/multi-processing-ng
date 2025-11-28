import { inject, Injectable } from '@angular/core';
import { AddressAdapter } from './address-adapter';
import { HttpClient } from '@angular/common/http';
import { AddressApiData } from '../../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private addressAdapterService = inject(AddressAdapter)
  private httpClient = inject(HttpClient)
  private baseUrl = 'http://localhost:8080/api/address'

  updateAddress(add: AddressApiData) {
    
  }
}
