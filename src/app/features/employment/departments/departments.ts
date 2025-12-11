import { Component, inject, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DepartmentService } from './services/department-service';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DepartmentCard } from './department-card/department-card';
import { DepartmentUiData } from '../models/department.model';
import { Router } from '@angular/router';
import { DepartmentFilter } from './department-filter/department-filter';

@Component({
  selector: 'app-departments',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,

    DepartmentCard,
    DepartmentFilter,
  ],
  templateUrl: './departments.html',
  styleUrl: './departments.scss',
})
export class Departments implements OnDestroy {
  private departmentService = inject(DepartmentService)
  private router = inject(Router)

  loading = true

  departments = this.departmentService.departmentList

  constructor() {
    toObservable(this.departments).subscribe(data => {
      if (data.data) {
        this.loading = false
      }
    })
    this.departmentService.loadDepatments()
  }

  openDepartment(item: DepartmentUiData) {
    this.router.navigate([`employment/departments/${item.id}`])
  }

  ngOnDestroy(): void {
    this.loading = true
  }
}
