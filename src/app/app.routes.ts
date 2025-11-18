import { Routes } from '@angular/router';
import { Overview } from './features/overview/overview';
import { Crypto } from './features/crypto/crypto';
import { Employment } from './features/employment/employment';

export const routes: Routes = [
  {
    path: "",
    component: Overview
  },
  {
    path: "employment",
    component: Employment
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
