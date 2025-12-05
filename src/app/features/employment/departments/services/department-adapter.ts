import { Injectable } from '@angular/core';
import { DepartmentApiData, DepartmentUiData } from '../../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentAdapter {

  toUi(data: DepartmentApiData): DepartmentUiData {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      created_at: data.created_at,
      updated_at: data.updated_at,
    }
  }

  toApi(data: DepartmentUiData): DepartmentApiData {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      created_at: data.created_at,
      updated_at: data.updated_at,
    }
  }

  toDepartmentUiList(apiList: DepartmentApiData[]): DepartmentUiData[] {
    return apiList.map((data) => this.toUi(data))
  }

  toDepartmentApiList(uiList: DepartmentUiData[]): DepartmentApiData[] {
    return uiList.map((data) => this.toApi(data))
  }
}
