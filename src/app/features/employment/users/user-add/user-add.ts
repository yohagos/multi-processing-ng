import { AfterViewInit, Component, inject, OnInit, signal } from '@angular/core';
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
import { SnackbarService } from '../../../../shared/services/snackbar-service';
import { debounceTime, distinctUntilChanged, mergeMap } from 'rxjs';
import { UserApiData } from '../../models/user.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AddressApiData } from '../../models/address.model';

@Component({
  selector: 'app-user-add',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
  ],
  templateUrl: './user-add.html',
  styleUrl: './user-add.scss',
})
export class UserAdd implements OnInit, AfterViewInit {
  private fb = inject(FormBuilder);
  private snackbarService = inject(SnackbarService)
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
    date_of_birth: ['', [Validators.required]],
    hire_date: [new Date, [Validators.required]]
  });

  addressForm = this.fb.group({
    id: [''],
    user_id: [''],
    street: ['', [Validators.required]],
    city: ['', [Validators.required]],
    zip_code: ['', [Validators.required]],
    country: ['', [Validators.required]],
  });

  departmentForm = this.fb.group({
    id: [''],
    name: [{ value: '', disabled: true }, [Validators.required]],
    description: [{ value: '', disabled: true }, [Validators.required]],
  });

  positionForm = this.fb.group({
    id: [''],
    title: [{ value: '', disabled: true }, [Validators.required]],
    level: [{ value: '', disabled: true }, [Validators.required]],
  });

  selectedDepartment = signal<DepartmentUiData | undefined>(undefined);
  selectedPosition = signal<PositionUiData | undefined>(undefined);

  availableDepartments = this.departmentService.departmentList;
  availablePositions = this.positionService.positionsList;

  ngOnInit(): void {
    this.departmentService.loadDepatments();
    this.positionService.loadPositionList();
  }

  ngAfterViewInit(): void {
    this.userForm.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(
          (prev, curr) => prev?.first_name === curr?.first_name
                          && prev?.last_name === curr?.last_name
        )
      )
      .subscribe((values) => {
        if (values?.first_name || values?.last_name) {
          const email = `${values.first_name?.toLowerCase()}.${values.last_name?.toLowerCase()}@it-consulting.de`
          this.userForm.patchValue({email: email})
        }
      })
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

  onSubmit() {
    const userData: UserApiData = {
      id: '',
      first_name: this.userForm.get("first_name")?.value || '',
      last_name: this.userForm.get("last_name")?.value || '',
      email: this.userForm.get("email")?.value || '',
      department_id: this.departmentForm.get('id')?.value || '',
      position_id: this.positionForm.get('id')?.value || '',
      hire_date: this.userForm.get("hire_date")?.value || new Date,
      phone: this.userForm.get("phone")?.value || '',
      date_of_birth: this.userForm.get("date_of_birth")?.value || ''
    }

    console.log("User Object for creation => ", userData)

    this.userService.createUser(userData)
      .pipe(
        mergeMap((response) => this.addressService.createAddress(
          {
            id: '',
            user_id: response.id,
            street: this.addressForm.get('street')?.value || '',
            city: this.addressForm.get('city')?.value || '',
            zip_code: this.addressForm.get('zip_code')?.value || '',
            country: this.addressForm.get('country')?.value || '',
            is_primary: true,
          }
        ))
      ).subscribe({
        next: () => this.userService.getUsers(1, 10)
      })
  }
}
