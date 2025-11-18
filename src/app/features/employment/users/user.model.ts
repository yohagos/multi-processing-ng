import { HttpErrorResponse } from "@angular/common/http"

export interface UserModel {
  id: string
  first_name: string
  last_name: string
  email: string
  created_at: Date
  updated_at: Date
}

export interface UserUpdateModel {
  first_name: string
  last_name: string
  email: string
}

export interface UserPage {
  data: UserUiData[]
  total: number
  error: HttpErrorResponse | null
}

export interface UserApiData {
  id: string
  first_name: string
  last_name: string
  email: string
  created_at: Date
  updated_at: Date
}

export interface UserUiData {
  id: string
  full_name: string
  first_name: string
  last_name: string
  email: string
  created_at: Date
  updated_at: Date
}

