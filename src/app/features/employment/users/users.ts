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
import { UserUiData } from '../models/user.model';
import { UserService } from './services/user-service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserDetail } from './user-detail/user-detail';
import { UserEdit } from './user-edit/user-edit';
import { ActivatedRoute } from '@angular/router';

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
export class Users implements OnInit, AfterViewInit {
  private userService = inject(UserService);
  private route = inject(ActivatedRoute)

  page = 1;
  limit = 10;

  displayedColumns: string[] = ['full_name', 'first_name', 'last_name', 'email', 'actions'];
  dataSource: MatTableDataSource<UserUiData> = new MatTableDataSource<UserUiData>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator

  loading = this.userService.isListLoading();

  selectedUser = this.userService.selectedUser;
  editMode = signal(false);

  withDetails = signal(false)

  constructor() {
    const withDetails = this.route.snapshot.url.some(segment => segment.path === 'with-details')
    this.withDetails.set(withDetails)
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
    this.userService.getUsers(this.withDetails(), this.page, this.limit)
  }

  showDetailsForUser(user: UserUiData) {
    this.userService.selectedUser.set(user);
  }

  editUser(user: UserUiData) {
    this.editMode.set(true);
    this.userService.selectedUser.set(user);
  }

  deleteUser(user: UserUiData) {
    this.userService.deleteUserById(user.id).subscribe({
      next: () => this.userService.getUsers(this.withDetails(), this.page, this.limit),
    });
  }
}
