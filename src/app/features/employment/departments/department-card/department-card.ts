import { Component, Input } from '@angular/core';
import { DepartmentUiData } from '../../models/department.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-department-card',
  imports: [
    MatCardModule,
  ],
  templateUrl: './department-card.html',
  styleUrl: './department-card.scss',
})
export class DepartmentCard {
  @Input('department') department!: DepartmentUiData
}
