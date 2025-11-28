import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { UserUiDataWithDetails } from '../../models/user.model';
import { AddressApiData } from '../../models/address.model';
import { UserAdapter } from '../services/user-adapter';

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
  private userAdapterService = inject(UserAdapter)
  private skillService = inject(SkillService);
  private departmentService = inject(DepartmentService);
  private positionService = inject(PositionService);
  private fb = inject(FormBuilder);

  selectedUser = this.userService.selectedUser;
  skillsByUserId = this.skillService.skillsByUserId;
  listOfDepartments = this.departmentService.departmentList;
  listOfPositions = this.positionService.positionsList;
  listOfSkills = this.skillService.skillList

  userWithDetailsForm = this.fb.group({
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email: [{value: '', disabled: true}, [Validators.required, Validators.email]],
    department_id: ['', [Validators.required]],
    position_id: ['', [Validators.required]],
    phone: ['', [Validators.required]],

    department: this.fb.group({
      name: [{ value: '', disabled: true }],
      description: [{ value: '', disabled: true }],
    }),
    position: this.fb.group({
      title: [{ value: '', disabled: true }],
      level: [{ value: '', disabled: true }],
    }),
    address: this.fb.group({
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

  currentAddress = signal<AddressApiData | undefined>(undefined)

  userSkills = signal<SkillUiData[]>([])

  private initialFormValue: any;

  constructor() {
    toObservable(this.userService.selectedUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (!user) return;
        this.skillService.getSkillsByUserId(user?.id);

        this.userWithDetailsForm.patchValue({
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
        });

        this.userWithDetailsForm.get('position')?.patchValue({
          title: user.position.title,
          level: user.position.level.toString(),
        });

        this.userWithDetailsForm.get('department')?.patchValue({
          name: user.department.name,
          description: user.department.description,
        });

        if (user.skill && user.skill.length > 0) {
          this.loadSkills(user.skill);
          this.userSkills.set(user.skill)
          this.currentAddress.set(user.address)
          this.selectedDepartment.set(user.department)
          this.selectedPosition.set(user.position)
        }

        this.initialFormValue = JSON.parse(JSON.stringify(this.userWithDetailsForm.getRawValue()));
      });
  }

  ngOnInit(): void {
    this.positionService.loadPositionList();
    this.departmentService.loadDepatments();
    this.skillService.loadSkills();
  }

  ngAfterViewInit(): void {
    this.userWithDetailsForm.valueChanges
    .pipe(
      debounceTime(150),
      distinctUntilChanged(
        (prev, curr) =>
          prev.first_name === curr.first_name && prev.last_name === curr.last_name
      )
    )
    .subscribe(values => {
        if (values.first_name || values.last_name) {
          const newEmail = `${values.first_name?.toLowerCase()}.${values.last_name?.toLowerCase()}@it-consulting.de`
          this.userWithDetailsForm.patchValue({email: newEmail})
        }
      })
  }

  createSkillForm(skill: SkillUiData): FormGroup {
    return this.fb.group({
      id: { value: skill.id, disabled: true },
      name: { value: skill.name, disabled: true },
      category: { value: skill.category, disabled: true },
    });
  }

  loadSkills(skills: SkillUiData[]) {
    const skillsArray = this.userWithDetailsForm.get('skill') as FormArray;

    while (skillsArray.length > 0) {
      skillsArray.removeAt(0);
    }

    skills.forEach((sk) => {
      skillsArray.push(this.createSkillForm(sk));
    });
  }

  hasChanges(): boolean {
    const currentValue = this.userWithDetailsForm.getRawValue()
    return JSON.stringify(currentValue) === JSON.stringify(this.initialFormValue);
  }

  onPositionChange(id: string) {
    const pos = this.listOfPositions().data.find((d) => d.id === id);
    this.selectedPosition.set(pos);

    if (pos) {
      this.userWithDetailsForm.get('position')?.patchValue({
        title: pos.title,
        level: pos.level.toString(),
      });
    }
  }

  onDepartmentChange(id: string) {
    const dep = this.listOfDepartments().data.find((d) => d.id === id);
    this.selectedDepartment.set(dep);

    if (dep) {
      this.userWithDetailsForm.get('department')?.patchValue({
        name: dep.name,
        description: dep.description,
      });
    }
  }

  onSkillChange(id: string) {
    if (this.userSkills().find(s => s.id === id)) return

    const skill = this.listOfSkills().data.find(sk => sk.id === id)
    if (!skill) return
    this.userSkills().push(skill)

    if (!this.selectedUser()?.id) return
    this.skillService.addSkillForUser(skill.id, this.selectedUser()!.id)
  }

  removeSkill(id: string) {
    if (!this.userSkills().find(s => s.id !== id)) return

    const skill = this.userSkills().find(s => s.id === id)
    if (!skill) return

    this.userSkills.update(skills => skills.filter(sk => sk.id !== id))
    if (!this.selectedUser()?.id) return

    this.skillService.removeSkillForUser(skill.id, this.selectedUser()!.id)
  }

  onSubmit() {
    console.log("clicked on save")
    if (this.selectedUser() && this.selectedUser()!.id) {
      let userData = this.userAdapterService.toUserWithDetails(this.selectedUser()!.id, this.userWithDetailsForm)
      if (this.selectedPosition()) userData.position = this.selectedPosition()!
      if (this.selectedDepartment()) userData.department = this.selectedDepartment()!
      if (this.currentAddress() && this.currentAddress()?.id) userData.address = this.currentAddress()
        console.log("UserData before calling service => ", userData)
      this.userService.updateUserInformations(userData)
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
