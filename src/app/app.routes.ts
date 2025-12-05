import { Routes } from '@angular/router';
import { Overview } from './features/overview/overview';
import { Crypto } from './features/crypto/crypto';

export const routes: Routes = [
  {
    path: "",
    component: Overview
  },
  {
    path: "employment",
    loadChildren: () => import("./features/employment/employment.routes").then(mod => mod.routes),
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
