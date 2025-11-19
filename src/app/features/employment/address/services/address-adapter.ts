import { Injectable } from '@angular/core';
import { AddressApiData, AddressUiData } from '../../models/address.model';

@Injectable({
  providedIn: 'root',
})
export class AddressAdapter {
  toUi(data?: AddressApiData): AddressUiData | undefined {
    if (data) {
      return {
        id: data.id,
        user_id: data.user_id,
        street: data.street,
        city: data.city,
        zip_code: data.zip_code,
        country: data.country,
        is_primary: data.is_primary,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    }
    return undefined;
  }

  toApi(data?: AddressUiData): AddressApiData | undefined {
    if (data) {
      return {
        id: data.id,
        user_id: data.user_id,
        street: data.street,
        city: data.city,
        zip_code: data.zip_code,
        country: data.country,
        is_primary: data.is_primary,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    }
    return undefined;
  }
}
