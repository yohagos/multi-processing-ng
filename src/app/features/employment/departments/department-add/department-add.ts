import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from '../services/department-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from "@angular/material/input";
import { SnackbarService } from '../../../../shared/services/snackbar-service';
import { DepartmentApiData } from '../../models/department.model';

@Component({
  selector: 'app-department-add',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
],
  templateUrl: './department-add.html',
  styleUrl: './department-add.scss',
})
export class DepartmentAdd {
  private dialogRef = inject(MatDialogRef)
  private departmentService = inject(DepartmentService)
  private snackbarService = inject(SnackbarService)
  private fb = inject(FormBuilder)

  addForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]]
  })

  onSubmit() {
    if (!this.addForm.valid) {
      return
    }
    const dep: Partial<DepartmentApiData> = {
      name: this.addForm.get('name')?.value || undefined,
      description: this.addForm.get('description')?.value || undefined,
    }

    this.departmentService.createDepartment(dep).subscribe(response => {
      this.snackbarService.snackbarMessage("send", "success")
      this.departmentService.loadDepatments()
      this.dialogRef.close()
    })
  }
}
