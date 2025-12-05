import { inject, Injectable } from '@angular/core';
import { UserApiDataWithDetails, UserUiDataWithDetails } from '../../models/user.model';
import { DepartmentAdapter } from '../../departments/services/department-adapter';
import { PositionAdapter } from '../../positions/services/position-adapter';
import { AddressAdapter } from '../../address/services/address-adapter';
import { SkillAdapter } from '../../skill/services/skill-adapter';
import { FormGroup } from '@angular/forms';

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

  toUserWithDetails(id: string, data: FormGroup, initialFormValue?: any): UserUiDataWithDetails {
    const dep = data.get('department')?.value
    const pos = data.get('position')?.value
    const add = data.get('address')?.value

    return{
      id: id,
      full_name: `${data.get("user")?.get('first_name')?.value} ${data.get("user")?.get('last_name')?.value}`,
      first_name: data.get("user")?.get('first_name')?.value,
      last_name: data.get("user")?.get('last_name')?.value,
      email: data.get("user")?.get('email')?.value,
      department_id: data.get("user")?.get('department_id')?.value,
      position_id: data.get("user")?.get('position_id')?.value,
      hire_date: data.get("user")?.get('hire_date')?.value,
      phone: data.get("user")?.get('phone')?.value,
      date_of_birth: data.get("user")?.get('date_of_birth')?.value,
      created_at: data.get("user")?.get('created_at')?.value,
      updated_at: data.get("user")?.get('updated_at')?.value,
      department:{
        id: dep.id,
        description: dep.description,
        name: dep.name,
      },
      position:{
        id: pos.id,
        department_id: pos.department_id,
        title: pos.title,
        level: pos.level,
      },
      skill: [],
      address: add ? {
        id: add.id,
        user_id: add.user_id,
        street: add.street,
        city: add.city,
        zip_code: add.zip_code,
        country: add.country,
        is_primary: add.is_primary,
      } : undefined,
    }
  }
}
