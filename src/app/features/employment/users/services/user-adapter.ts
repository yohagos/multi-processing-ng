import { inject, Injectable } from '@angular/core';
import { UserApiDataWithDetails, UserUiDataWithDetails } from '../../models/user.model';
import { DepartmentAdapter } from '../../departments/services/department-adapter';
import { PositionAdapter } from '../../positions/services/position-adapter';
import { AddressAdapter } from '../../address/services/address-adapter';
import { SkillAdapter } from '../../skill/services/skill-adapter';

@Injectable({
  providedIn: 'root',
})
export class UserAdapter {
  private _departmentAdapter = inject(DepartmentAdapter)
  private _positionAdapter = inject(PositionAdapter)
  private _addressAdapter = inject(AddressAdapter)
  private _skillAdapter = inject(SkillAdapter)

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
      address: this._addressAdapter.toUi(data.address),
      skill: this._skillAdapter.toUiList(data.skill)
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
      address: this._addressAdapter.toApi(data.address),
      skill: this._skillAdapter.toApiList(data.skill)
    }
  }

  toUiListWithDetails(data: UserApiDataWithDetails[]): UserUiDataWithDetails[] {
    return data.map((u) => this.toUiDataWithDetails(u))
  }
}
