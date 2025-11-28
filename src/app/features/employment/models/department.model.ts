import { HttpErrorResponse } from "@angular/common/http"

export interface DepartmentModel {
  id: string
  name: string
  description: string
  created_at?: string
  updated_at?: string
}

export interface DepartmentUpdateModel {
  name: string
  description: string
}

export interface DepartmentApiData {
  id: string
  name: string
  description: string
  created_at?: string
  updated_at?: string
}

export interface DepartmentUiData {
  id: string
  name: string
  description: string
  created_at?: string
  updated_at?: string
}

export interface DepartmentPage {
  data: DepartmentUiData[]
  total: number
  error: HttpErrorResponse | null
}
