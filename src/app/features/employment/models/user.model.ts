import { HttpErrorResponse } from "@angular/common/http"
import { DepartmentApiData, DepartmentUiData } from "./department.model"
import { PositionApiData, PositionUiData } from "./position.model"
import { SkillApiData, SkillUiData } from "./skill.model"
import { AddressApiData, AddressUiData } from "./address.model"

export interface UserPage {
  data: UserUiDataWithDetails[]
  total: number
  error: HttpErrorResponse | null
}

export interface UserApiData {
  id: string
  first_name: string
  last_name: string
  email: string
  department_id: string
  position_id: string
  hire_date: Date
  phone: string
  date_of_birth: string
  created_at?: Date
  updated_at?: Date
}

export interface UserUiData {
  id: string
  full_name: string
  first_name: string
  last_name: string
  email: string
  department_id: string
  position_id: string
  hire_date: Date
  phone: string
  date_of_birth: string
  created_at: Date
  updated_at: Date
}

export interface UserApiDataWithDetails {
  id: string
  first_name: string
  last_name: string
  email: string
  department_id: string
  position_id: string
  hire_date: Date
  phone: string
  date_of_birth: string
  created_at: Date
  updated_at: Date
  department: DepartmentApiData
  position: PositionApiData
  address?: AddressApiData
  skill: SkillApiData[]
}

export interface UserUiDataWithDetails {
  id: string
  full_name: string
  first_name: string
  last_name: string
  email: string
  department_id: string
  position_id: string
  hire_date: Date
  phone: string
  date_of_birth: string
  created_at: Date
  updated_at: Date
  department: DepartmentUiData
  position: PositionUiData
  skill: SkillUiData[]
  address?: AddressUiData
}
