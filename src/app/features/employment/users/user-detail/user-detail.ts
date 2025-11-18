import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../services/user-service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-user-detail',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatListModule,
  ],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail {
  private userService = inject(UserService)
  selectedUser = this.userService.selectedUser
}
