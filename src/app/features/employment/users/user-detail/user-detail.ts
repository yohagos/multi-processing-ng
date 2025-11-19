import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../services/user-service';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-user-detail',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatTabsModule,
  ],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail {
  private userService = inject(UserService)
  selectedUser = this.userService.selectedUser

  constructor() {
    console.log("SelectedUser informations => ", this.selectedUser())
  }
}
