import { Injectable } from '@angular/core';
import { UserApiData, UserUiData } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserAdapter {
  toUi(apiData: UserApiData): UserUiData {
    return {
      id: apiData.id,
      email: apiData.email,
      first_name: apiData.first_name,
      last_name: apiData.last_name,
      full_name: `${apiData.first_name} ${apiData.last_name}`,
      created_at: apiData.created_at,
      updated_at: apiData.updated_at,
    }
  }

  toApi(uiData: UserUiData): UserApiData {
    return {
      id: uiData.id,
      email: uiData.email,
      first_name: uiData.first_name,
      last_name: uiData.last_name,
      created_at: uiData.created_at,
      updated_at: uiData.updated_at,
    }
  }

  toUserUiList(apiList: UserApiData[]): UserUiData[] {
    return apiList.map(data => this.toUi(data))
  }

  toUserApiList(uiList: UserUiData[]): UserApiData[] {
    return uiList.map(data => this.toApi(data))
  }
}
