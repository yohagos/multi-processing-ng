import { AfterViewInit, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../services/user-service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { SkillService } from '../../skill/services/skill-service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { SkillUiData } from '../../models/skill.model';
import { DepartmentService } from '../../departments/services/department-service';
import { PositionService } from '../../positions/services/position-service';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { PositionUiData } from '../../models/position.model';
import { DepartmentUiData } from '../../models/department.model';
import { MatIconModule } from '@angular/material/icon';
import { UserAdapter } from '../services/user-adapter';
import { AddressService } from '../../address/services/address-service';
import { UserApiDataWithDetails } from '../../models/user.model';

@Component({
  selector: 'app-user-edit',
  imports: [
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
  ],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.scss',
})
export class UserEdit implements OnInit, AfterViewInit, OnDestroy {
  private userService = inject(UserService);
  private userAdapterService = inject(UserAdapter);
  private skillService = inject(SkillService);
  private departmentService = inject(DepartmentService);
  private positionService = inject(PositionService);
  private addressService = inject(AddressService);
  private fb = inject(FormBuilder);

  selectedUser = this.userService.selectedUser;
  skillsByUserId = this.skillService.skillsByUserId;
  listOfDepartments = this.departmentService.departmentList;
  listOfPositions = this.positionService.positionsList;
  listOfSkills = this.skillService.skillList;

  form = this.fb.group({
    user: this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      department_id: ['', [Validators.required]],
      position_id: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    }),
    department: this.fb.group({
      id: [''],
      name: [{ value: '', disabled: true }],
      description: [{ value: '', disabled: true }],
    }),
    position: this.fb.group({
      id: [''],
      title: [{ value: '', disabled: true }],
      level: [{ value: '', disabled: true }],
    }),
    address: this.fb.group({
      id: [''],
      user_id: [''],
      street: [''],
      city: [''],
      zip_code: [''],
      country: [''],
    }),
    skill: this.fb.array<FormGroup>([]),
  });

  private destroy$ = new Subject<void>();

  selectedPosition = signal<PositionUiData | undefined>(undefined);
  selectedDepartment = signal<DepartmentUiData | undefined>(undefined);

  userSkills = signal<SkillUiData[]>([]);

  private initialFormValue: any;

  originalData: UserApiDataWithDetails | undefined

  constructor() {
    toObservable(this.userService.selectedUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (!user) return;
        this.originalData = user
        this.skillService.getSkillsByUserId(user?.id);

        this.form.get("user")?.patchValue({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            department_id: user.department_id,
            position_id: user.position_id,
            phone: user.phone,
        });

        this.form.get("address")?.patchValue({
            id: user.address!.id,
            user_id: user.id,
            street: user.address!.street,
            city: user.address!.city,
            zip_code: user.address!.zip_code,
            country: user.address!.country,
        });

        this.form.get('position')?.patchValue({
          id: user.position_id,
          title: user.position.title,
          level: user.position.level.toString(),
        });

        this.form.get('department')?.patchValue({
          id: user.department_id,
          name: user.department.name,
          description: user.department.description,
        });

        if (user.skill && user.skill.length > 0) {
          this.loadSkills(user.skill);
          this.userSkills.set(user.skill);
          this.selectedDepartment.set(user.department);
          this.selectedPosition.set(user.position);
        }

        this.initialFormValue = JSON.parse(JSON.stringify(this.form.getRawValue()));
      });
  }

  ngOnInit(): void {
    this.positionService.loadPositionList();
    this.departmentService.loadDepatments();
    this.skillService.loadSkills();
  }

  ngAfterViewInit(): void {
    this.form.valueChanges
      .pipe(
        debounceTime(150),
        distinctUntilChanged(
          (prev, curr) => prev.user?.first_name === curr.user?.first_name
                          && prev.user?.last_name === curr.user?.last_name
        )
      )
      .subscribe((values) => {
        if (values.user?.first_name || values.user?.last_name) {
          const newEmail = `${values.user?.first_name?.toLowerCase()}.${values.user?.last_name?.toLowerCase()}@it-consulting.de`;
          this.form.get("user")?.get("email")?.setValue(newEmail)
        }
      });
  }

  createSkillForm(skill: SkillUiData): FormGroup {
    return this.fb.group({
      id: { value: skill.id, disabled: true },
      name: { value: skill.name, disabled: true },
      category: { value: skill.category, disabled: true },
    });
  }

  loadSkills(skills: SkillUiData[]) {
    const skillsArray = this.form.get('skill') as FormArray;

    while (skillsArray.length > 0) {
      skillsArray.removeAt(0);
    }

    skills.forEach((sk) => {
      skillsArray.push(this.createSkillForm(sk));
    });
  }

  hasChanges(): boolean {
    const currentValue = this.form.getRawValue();
    return JSON.stringify(currentValue) === JSON.stringify(this.initialFormValue);
  }

  onPositionChange(id: string) {
    const pos = this.listOfPositions().data.find((d) => d.id === id);
    this.selectedPosition.set(pos);

    if (pos) {
      this.form.get('position')?.patchValue({
        id: pos.id,
        title: pos.title,
        level: pos.level.toString(),
      });
    }
  }

  onDepartmentChange(id: string) {
    const dep = this.listOfDepartments().data.find((d) => d.id === id);
    this.selectedDepartment.set(dep);

    if (dep) {
      this.form.get('department')?.patchValue({
        id: dep.id,
        name: dep.name,
        description: dep.description,
      });
    }
  }

  onSkillChange(id: string) {
    if (this.userSkills().find((s) => s.id === id)) return;

    const skill = this.listOfSkills().data.find((sk) => sk.id === id);
    if (!skill) return;
    this.userSkills().push(skill);

    if (!this.selectedUser()?.id) return;
    this.skillService.addSkillForUser(skill.id, this.selectedUser()!.id);
  }

  removeSkill(id: string) {
    if (!this.userSkills().find((s) => s.id !== id)) return;

    const skill = this.userSkills().find((s) => s.id === id);
    if (!skill) return;

    this.userSkills.update((skills) => skills.filter((sk) => sk.id !== id));
    if (!this.selectedUser()?.id) return;

    this.skillService.removeSkillForUser(skill.id, this.selectedUser()!.id);
  }

  onSubmit() {
    if (this.selectedUser() && this.selectedUser()?.id) {
      if (this.selectedDepartment()) {
        this.patchDepartmentForSubmit();
      }
      if (this.selectedPosition()) {
        this.patchPositionForSubmit();
      }

      const user = this.userAdapterService.toUserWithDetails(
        this.selectedUser()!.id,
        this.form,
        this.initialFormValue
      );
      this.userService.updateAllUserData(user, this.originalData!);
    }
  }

  patchDepartmentForSubmit() {
    if (this.selectedDepartment()?.id) {
      this.form.get("user")?.get('department_id')?.setValue(this.selectedDepartment()!.id);
      this.form.get('department')?.patchValue({
        id: this.selectedDepartment()!.id,
        description: this.selectedDepartment()!.description,
        name: this.selectedDepartment()!.name,
      });
    }
  }

  patchPositionForSubmit() {
    if (this.selectedDepartment()?.id) {
      this.form.get("user")?.get('position_id')?.setValue(this.selectedPosition()!.id);
      this.form.get('position')?.patchValue({
        id: this.selectedPosition()!.id,
        level: this.selectedPosition()!.level.toString(),
        title: this.selectedPosition()!.title,
      });
    }
  }

  onCancel() {
    this.userService.selectedUser.set(undefined);
    this.skillService.skillsByUserId.set([]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
