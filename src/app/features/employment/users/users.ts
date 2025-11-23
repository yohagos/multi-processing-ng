import {
  AfterViewInit,
  Component,
  effect,
  inject,
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

@Component({
  selector: 'app-users',
  imports: [
    CommonModule,

    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit, AfterViewInit {
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
      console.log("Data received => ", pageData.data)
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
      minHeight: "30em",
    })

    dialogRef.afterClosed().subscribe(result => console.log("Dialog closed | Result => ", result))
  }

  editUser(user: UserUiDataWithDetails) {
    this.editMode.set(true);
    this.userService.selectedUser.set(user);
  }

  deleteUser(user: UserUiDataWithDetails) {
    this.userService.deleteUserById(user.id).subscribe({
      next: () => this.userService.getUsers(this.page, this.limit),
    });
  }

}
