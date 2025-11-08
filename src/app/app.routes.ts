import { Routes } from '@angular/router';
import { Overview } from './features/overview/overview';
import { Users } from './features/users/users';
import { Crypto } from './features/crypto/crypto';

export const routes: Routes = [
  {
    path: "",
    component: Overview
  },
  {
    path: "users",
    component: Users
  },
  {
    path: "crypto",
    component: Crypto
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full"
  }
];
