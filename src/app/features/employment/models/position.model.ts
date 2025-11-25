import { HttpErrorResponse } from "@angular/common/http";

export interface PositionApiData {
  id: string;
  title: string;
  level: number;
  department_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface PositionUiData {
  id: string;
  title: string;
  level: number;
  department_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface PositionPage {
  data: PositionUiData[],
  total: number,
  error: HttpErrorResponse | null
}
