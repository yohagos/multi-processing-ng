import { Injectable } from '@angular/core';
import { PositionApiData, PositionUiData } from '../../models/position.model';

@Injectable({
  providedIn: 'root'
})
export class PositionAdapter {

  toUi(data: PositionApiData): PositionUiData {
    return {
      id: data.id,
      title: data.title,
      level: data.level,
      department_id: data.department_id,
      created_at: data.created_at,
      updated_at: data.updated_at,
    }
  }

  toApi(data: PositionUiData): PositionApiData {
    return {
      id: data.id,
      title: data.title,
      level: data.level,
      department_id: data.department_id,
      created_at: data.created_at,
      updated_at: data.updated_at,
    }
  }

  toUiList(data: PositionApiData[]): PositionUiData[] {
    return data.map((data) => this.toUi(data))
  }

  toApiList(data: PositionUiData[]): PositionApiData[] {
    return data.map((data) => this.toUi(data))
  }
}
