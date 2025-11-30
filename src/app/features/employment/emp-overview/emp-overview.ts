import { Component, inject } from '@angular/core';
import { EmpCard } from './emp-card';
import { EmpCardModel } from '../models/emp-card.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-overview',
  imports: [
    EmpCard,
  ],
  templateUrl: './emp-overview.html',
  styleUrl: './emp-overview.scss',
})
export class EmpOverview {
  private readonly _router = inject(Router)

  cards: EmpCardModel[] = [
    {
      title: "Users",
      description: "A specific overview of current employees, with just the basic user information.",
      image: undefined,
      link: 'employment/users',
    },
    {
      title: "Departments",
      description: "Tabular overview of departments which we currently have.",
      image: undefined,
      link: 'employment/departments',
    },
    {
      title: "Positions",
      description: "Overview of positions.",
      image: undefined,
      link: 'employment/positions',
    },
  ]

  navigateTo(route: string) {
    this._router.navigate([route])
  }
}
