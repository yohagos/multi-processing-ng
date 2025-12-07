import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { UserService } from '../services/user-service';
import { DepartmentService } from '../../departments/services/department-service';
import { PositionService } from '../../positions/services/position-service';
import { AddressService } from '../../address/services/address-service';
import { DepartmentUiData } from '../../models/department.model';
import { PositionUiData } from '../../models/position.model';

@Component({
  selector: 'app-user-add',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
  ],
  templateUrl: './user-add.html',
  styleUrl: './user-add.scss',
})
export class UserAdd implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private departmentService = inject(DepartmentService);
  private positionService = inject(PositionService);
  private addressService = inject(AddressService);

  userForm = this.fb.group({
    id: [''],
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
  });

  addressForm = this.fb.group({
    id: [''],
    user_id: [''],
    street: [''],
    city: [''],
    zip_code: [''],
    country: [''],
  });

  departmentForm = this.fb.group({
    id: [''],
    name: [{ value: '', disabled: true }],
    description: [{ value: '', disabled: true }],
  });

  positionForm = this.fb.group({
    id: [''],
    title: [{ value: '', disabled: true }],
    level: [{ value: '', disabled: true }],
  });

  selectedDepartment = signal<DepartmentUiData | undefined>(undefined);
  selectedPosition = signal<PositionUiData | undefined>(undefined);

  availableDepartments = this.departmentService.departmentList;
  availablePositions = this.positionService.positionsList;

  ngOnInit(): void {
    this.departmentService.loadDepatments();
    this.positionService.loadPositionList();
  }

  onDepartmentChange(id: string) {
    const dep = this.availableDepartments().data.find((d) => d.id === id);
    this.selectedDepartment.set(dep);

    if (dep) {
      this.departmentForm.patchValue({
        id: dep.id,
        name: dep.name,
        description: dep.description,
      });
    }
  }

  onPositionChange(id: string) {
    const pos = this.availablePositions().data.find((p) => p.id === id);
    this.selectedPosition.set(pos);

    if (pos) {
      this.positionForm.patchValue({
        id: pos.id,
        title: pos.title,
        level: pos.level.toString(),
      });
    }
  }
}
