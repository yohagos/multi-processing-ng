import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserUiData } from './user.model';
import { UserService } from './user-service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserDetail } from './user-detail/user-detail';
import { UserEdit } from './user-edit/user-edit';

@Component({
  selector: 'app-users',
  imports: [
    CommonModule,
    UserDetail,
    UserEdit,

    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements AfterContentChecked, AfterViewInit {
  private userService = inject(UserService);
  page = 1;
  limit = 10;

  displayedColumns: string[] = ['full_name', 'first_name', 'last_name', 'email', 'actions'];
  dataSource!: MatTableDataSource<UserUiData>;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator();

  loading = this.userService.isListLoading();

  selectedUser = this.userService.selectedUser
  editMode = signal(false)

  constructor() {
    this.userService.getUsers(this.page, this.limit);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngAfterContentChecked(): void {
    this.dataSource = new MatTableDataSource<UserUiData>(this.userService.userPage().data);
  }

  showDetailsForUser(user: UserUiData) {
    console.log("Selected User => ", user)
    this.userService.selectedUser.set(user)
  }

  editUser(user: UserUiData) {
    console.log("Editing User => ", user)
    this.editMode.set(true)
    this.userService.selectedUser.set(user)
  }

  deleteUser(user: UserUiData) {
    this.userService.deleteUserById(user.id).subscribe({
      next: () => this.userService.getUsers(this.page, this.limit)
    })
  }
}
