import { Component, inject, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DepartmentService } from '../services/department-service';
import { DepartmentUiData } from '../../models/department.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-department-detail',
  imports: [
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './department-detail.html',
  styleUrl: './department-detail.scss',
})
export class DepartmentDetail implements OnDestroy {
  private departmentService = inject(DepartmentService)
  departments = this.departmentService.departmentList
  currentDepartment: DepartmentUiData | undefined

  private routes = inject(ActivatedRoute)
  private router = inject(Router)

  constructor() {
    this.routes.params.subscribe(params => {
      const id = params['id']
      !id
        ? this.router.navigate(['employment/departments'])
        : this.currentDepartment = this.departments().data.find(d => d.id === id)

      if (!this.currentDepartment) {
        this.router.navigate(['employment/departments'])
      }
    })
  }

    ngOnDestroy(): void {
      this.currentDepartment = undefined
    }
}
