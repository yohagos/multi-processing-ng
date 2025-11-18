import { Routes } from '@angular/router';
import { EmpOverview } from './emp-overview/emp-overview';
import { Users } from './users/users';
import { Departments } from './departments/departments';
import { Positions } from './positions/positions';
import { Employment } from './employment';

export const routes: Routes = [
  {
    path: '',
    component: Employment,
    children: [
      {
        path: 'overview',
        component: EmpOverview,
      },
      {
        path: 'users',
        component: Users,
      },
      {
        path: 'users/with-details',
        component: Users,
      },
      {
        path: 'departments',
        component: Departments,
      },
      {
        path: 'positions',
        component: Positions,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
