import { Injectable } from '@angular/core';
import { SkillUiData, SkillApiData } from '../../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillAdapter {
  toUi(data: SkillApiData): SkillUiData {
    return {
      id: data.id,
      name: data.name,
      category: data.category,
      created_at: data.created_at,
      updated_at: data.updated_at,
    }
  }

  toApi(data: SkillUiData): SkillApiData {
    return {
      id: data.id,
      name: data.name,
      category: data.category,
      created_at: data.created_at,
      updated_at: data.updated_at,
    }
  }

  toUiList(data: SkillApiData[]): SkillUiData[] {
    return data.map(s => this.toUi(s))
  }

  toApiList(data: SkillUiData[]): SkillApiData[] {
    return data.map(s => this.toUi(s))
  }
}
