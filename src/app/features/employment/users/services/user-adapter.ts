import { inject, Injectable } from '@angular/core';
import { UserApiData, UserApiDataWithDetails, UserUiData, UserUiDataWithDetails } from '../../models/user.model';
import { DepartmentAdapter } from '../../departments/services/department-adapter';
import { PositionAdapter } from '../../positions/services/position-adapter';

@Injectable({
  providedIn: 'root',
})
export class UserAdapter {
  private _departmentAdapter = inject(DepartmentAdapter)
  private _positionAdapter = inject(PositionAdapter)

  toUi(data: UserApiData): UserUiData {
    return {
      id: data.id,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      full_name: `${data.first_name} ${data.last_name}`,
      department_id: data.department_id,
      position_id: data.position_id,
      hire_date: data.hire_date,
      phone: data.phone,
      date_of_birth: data.date_of_birth,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  }

  toApi(data: UserUiData): UserApiData {
    return {
      id: data.id,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      department_id: data.department_id,
      position_id: data.position_id,
      hire_date: data.hire_date,
      phone: data.phone,
      date_of_birth: data.date_of_birth,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  }

  toUserUiList(apiList: UserApiData[]): UserUiData[] {
    return apiList.map((data) => this.toUi(data));
  }

  toUserApiList(uiList: UserUiData[]): UserApiData[] {
    return uiList.map((data) => this.toApi(data));
  }

  toUiDataWithDetails(data: UserApiDataWithDetails): UserUiDataWithDetails {
    return {
      id: data.id,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      full_name: `${data.first_name} ${data.last_name}`,
      department_id: data.department_id,
      position_id: data.position_id,
      hire_date: data.hire_date,
      phone: data.phone,
      date_of_birth: data.date_of_birth,
      created_at: data.created_at,
      updated_at: data.updated_at,
      department: this._departmentAdapter.toUi(data.department),
      position: this._positionAdapter.toUi(data.position),
    }
  }

  toApiDataWithDetails(data: UserUiDataWithDetails): UserApiDataWithDetails {
    return {
      id: data.id,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      department_id: data.department_id,
      position_id: data.position_id,
      hire_date: data.hire_date,
      phone: data.phone,
      date_of_birth: data.date_of_birth,
      created_at: data.created_at,
      updated_at: data.updated_at,
      department: this._departmentAdapter.toApi(data.department),
      position: this._positionAdapter.toApi(data.position),
    }
  }
}
