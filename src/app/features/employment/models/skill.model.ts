import { HttpErrorResponse } from "@angular/common/http"

export interface SkillApiData {
  id: string
  name: string
  category: string
  created_at: Date
  updated_at: Date
}

export interface SkillUiData {
  id: string
  name: string
  category: string
  created_at: Date
  updated_at: Date
}

export interface SkillWithDetailsUiData {
  id: string
  name: string
  category: string
  created_at: Date
  updated_at: Date
  proficiency_level: number
  acquired_date: Date
}

export interface SkillWithDetailsApiData {
  id: string
  name: string
  category: string
  created_at: Date
  updated_at: Date
  proficiency_level: number
  acquired_date: Date
}

export interface SkillPage {
  data: SkillUiData[]
  total: number
  error: HttpErrorResponse | null
}
