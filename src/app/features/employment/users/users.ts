import {
  AfterViewInit,
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserUiDataWithDetails } from '../models/user.model';
import { UserService } from './services/user-service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserDetail } from './user-detail/user-detail';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserEdit } from './user-edit/user-edit';
import { UserFilter } from './user-filter/user-filter';

@Component({
  selector: 'app-users',
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,

    UserFilter,
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit, AfterViewInit, OnDestroy {
  private userService = inject(UserService);
  private dialog = inject(MatDialog)

  page = 1;
  limit = 10;

  displayedColumns: string[] = ['full_name', 'email', 'department', "skills", 'actions'];
  dataSource: MatTableDataSource<UserUiDataWithDetails> = new MatTableDataSource<UserUiDataWithDetails>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator

  loading = this.userService.isListLoading();

  selectedUser = this.userService.selectedUser;
  editMode = signal(false);

  constructor() {
    effect(() => {
      const pageData = this.userService.userPage()
      this.dataSource.data = pageData.data
      if (this.paginator) {
        this.paginator.length = pageData.total
        this.paginator.pageIndex = this.page -1
      }
    })
  }

  ngOnInit(): void {
    this.loadUsers()
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe((ev) => {
      this.page = ev.pageIndex + 1;
      this.limit = ev.pageSize;
      this.loadUsers()
    });
  }

  private loadUsers() {
    this.userService.getUsers(this.page, this.limit)
  }

  showDetailsForUser(user: UserUiDataWithDetails) {
    this.userService.selectedUser.set(user);
    const dialogRef = this.dialog.open(UserDetail, {
      minHeight: "40em",
      maxHeight: "45em",
      minWidth: "60%",
    })
  }

  editUser(user: UserUiDataWithDetails) {
    this.userService.selectedUser.set(user);
    const dialogRef = this.dialog.open(UserEdit, {
      minHeight: "40em",
      maxHeight: "45em",
      minWidth: "60%",
    })
  }

  deleteUser(user: UserUiDataWithDetails) {
    this.userService.deleteUserById(user.id).subscribe({
      next: () => this.userService.getUsers(this.page, this.limit),
    });
  }

  ngOnDestroy(): void {

  }

}
