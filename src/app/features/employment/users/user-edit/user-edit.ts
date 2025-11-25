import {
  AfterViewInit,
  Component,
  effect,
  inject,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../services/user-service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { SkillService } from '../../skill/services/skill-service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { DatePipe } from '@angular/common';
import { SkillUiData, SkillWithDetailsUiData } from '../../models/skill.model';
import { DepartmentService } from '../../departments/services/department-service';
import { PositionService } from '../../positions/services/position-service';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-user-edit',
  imports: [
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
  ],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.scss',
})
export class UserEdit {
  private userService = inject(UserService);
  private skillService = inject(SkillService);
  private departmentService = inject(DepartmentService)
  private positionService = inject(PositionService)
  private fb = inject(FormBuilder)

  selectedUser = this.userService.selectedUser;
  skillsByUserId = this.skillService.skillsByUserId
  listOfDepartments = this.departmentService.departmentList
  listOfPositions = this.positionService.positionsList

  userWithDetailsForm = signal(
    new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.email,
      ]),
      department_id: new FormControl('', [Validators.required]),
      position_id: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      department: new FormGroup({
        name: new FormControl({value: '', disabled: true}),
        description: new FormControl({value: '', disabled: true}),
      }),
      position: new FormGroup({
        title: new FormControl({value: '', disabled: true}),
        level: new FormControl({value: '', disabled: true}),
      }),
      address: new FormGroup({
        street: new FormControl(''),
        city: new FormControl(''),
        zip_code: new FormControl(''),
        country: new FormControl(''),
      }),
    })
  );

  userSkillsForm = signal(
     new FormArray<FormGroup<{
      id: FormControl<string | null>;
      name: FormControl<string | null>;
      category: FormControl<string | null>;
      proficiency_level: FormControl<number | null>;
      acquired_date: FormControl<string | null>;
    }>>([])
  )

  constructor() {
    this.positionService.loadPositionList()
    this.departmentService.loadDepatments()
    effect(() => {
      const user = this.selectedUser();
      console.log(user)
      if (user) {
        this.skillService.getSkillsByUserId(user?.id)

        this.userWithDetailsForm().patchValue(
          {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            department_id: user.department_id,
            position_id: user.position_id,
            phone: user.phone,
            address: {
              street: user.address?.street,
              city: user.address?.city,
              zip_code: user.address?.zip_code,
              country: user.address?.country,
            },
            position: {
              title: user.position.title,
              level: user.position.level.toString(),
            },
            department: {
              name: user.department.name,
              description: user.department.description,
            },
          },
          { emitEvent: false }
        );
      }
    });

    /* this.form().valueChanges.subscribe((changes) => {
      if (changes.first_name || changes.last_name) {
        const newEmail = `${changes.first_name?.toLowerCase()}.${changes.last_name?.toLowerCase()}@test.de`;
        this.form().get('email')?.setValue(newEmail, { emitEvent: false });
      }
    }); */

  }

  populateItems(data: SkillWithDetailsUiData[]) {
    if (data.length > 0) {
      const newFormArray = new FormArray(
        data.map(sk => this.fb.group({
          id: [sk.id],
          name: [sk.name],
          category: [sk.category],
          proficiency_level: [sk.proficiency_level],
          acquired_date: [sk.acquired_date.toString()]
        }))
      )
      this.userSkillsForm.set(newFormArray)
    }
  }

  /* hasChanges() {
    return (
      //this.selectedUser()?.first_name !== this.form().get('first_name')?.value ||
      //this.selectedUser()?.last_name !== this.form().get('last_name')?.value
    );
  } */

  onSubmit() {
    if (this.selectedUser() && this.selectedUser()!.id) {
      /* this.userService.updateUser(
        this.selectedUser()!.id,
        {
          first_name: this.form().get('first_name')!.value || undefined,
          last_name: this.form().get('last_name')!.value || undefined,
          email: this.form().get('email')!.value || undefined,
        }
      ).subscribe({

      }) */
    }
  }

  onCancel() {
    this.userService.selectedUser.set(undefined)
    this.skillService.skillsByUserId.set([])
    //this.form().reset();
  }
}
