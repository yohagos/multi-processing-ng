import { Component, effect, inject, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../services/user-service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-edit',
  imports: [
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.scss',
})
export class UserEdit {
  private userService = inject(UserService)

  selectedUser = this.userService.selectedUser

  form = signal(
    new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl({value: '', disabled:true}, [Validators.required, Validators.email]),
    })
  )

  constructor() {
    effect(() => {
      const user = this.selectedUser()
      if (user) {
        this.form().patchValue({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        }, {emitEvent: false})
      }
    })

    this.form().valueChanges.subscribe(changes => {
     if (changes.first_name || changes.last_name) {
      const newEmail = `${changes.first_name?.toLowerCase()}.${changes.last_name?.toLowerCase()}@test.de`
      this.form().get('email')?.setValue(newEmail, {emitEvent: false})
     }
    })
  }

  hasChanges() {
    return this.selectedUser()?.first_name !== this.form().get("first_name")?.value ||
            this.selectedUser()?.last_name !== this.form().get("last_name")?.value
  }

  onSubmit() {
    if (this.selectedUser() && this.selectedUser()!.id) {
      this.userService.updateUser(
        this.selectedUser()!.id,
        {
          first_name: this.form().get('first_name')!.value || undefined,
          last_name: this.form().get('last_name')!.value || undefined,
          email: this.form().get('email')!.value || undefined,
        }
      ).subscribe({

      })
    }
  }

  onCancel() {
    this.userService.selectedUser.set(undefined)
    this.form().reset()
  }
}
