import { Routes } from '@angular/router';
import { Departments } from './departments';
import { DepartmentDetail } from './department-detail/department-detail';

export const routes: Routes = [
  {
    path: '',
    component: Departments,
  },
  {
    path: ':id',
    component: DepartmentDetail,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
