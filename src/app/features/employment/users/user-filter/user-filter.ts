import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserService } from '../services/user-service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DepartmentService } from '../../departments/services/department-service';
import { debounce, debounceTime, map, merge } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserAdd } from '../user-add/user-add';

@Component({
  selector: 'app-user-filter',
  imports: [
    ReactiveFormsModule,

    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSelectModule,
  ],
  templateUrl: './user-filter.html',
  styleUrl: './user-filter.scss',
})
export class UserFilter implements OnInit {
  private dialog = inject(MatDialog)
  private userService = inject(UserService)
  private departmentService = inject(DepartmentService)

  filterParams = signal<{searchName: string, departmentName: string}>({
    searchName: '',
    departmentName: '',
  })

  departments = this.departmentService.departmentList
  departmentInput = new FormControl('')
  searchInput = new FormControl('')

  constructor() {
    merge(
      this.searchInput.valueChanges.pipe(
        map(value => ({searchName: value || '', departmentName: this.departmentInput.value || ''}))
      ),
      this.departmentInput.valueChanges.pipe(
        map(value => ({searchName: this.searchInput.value || '', departmentName: value || ''}))
      ),
    ).pipe(
      debounceTime(200)
    ).subscribe(params => {
      this.filterParams.set(params)
      this.loadUsersWithFilters()
    })
  }

  ngOnInit(): void {
    this.departmentService.loadDepatments()
  }

  loadUsersWithFilters() {
    const params = this.filterParams()
    this.userService.getUsersWithFilter(1, 10, params.searchName, params.departmentName)
  }

  addUser() {
      const dialogRef = this.dialog.open(UserAdd, {
        minHeight: "40em",
        maxHeight: "45em",
        minWidth: "60%",
      })
    }
}
