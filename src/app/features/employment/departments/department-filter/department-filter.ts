import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DepartmentService } from '../services/department-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentAdd } from '../department-add/department-add';

@Component({
  selector: 'app-department-filter',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
],
  templateUrl: './department-filter.html',
  styleUrl: './department-filter.scss',
})
export class DepartmentFilter {
  private dialog = inject(MatDialog)
  private departmentService = inject(DepartmentService)

  searchInput = new FormControl('')

  constructor() {
    this.searchInput.valueChanges.pipe(
      debounceTime(200)
    ).subscribe(params => {
      if (params) {
        this.loadDepartmentsWithFilters(params)
      }
    })
  }

  openAddDepartment() {
    const dialogRef = this.dialog.open(DepartmentAdd, {
      maxHeight: "45em",
      width: "60%",
    })
  }

  clearSearch() {
    this.searchInput.reset()
  }

  loadDepartmentsWithFilters(searchName: string) {
    this.departmentService.loadDepartmentsWithFilter(searchName)
  }
}
