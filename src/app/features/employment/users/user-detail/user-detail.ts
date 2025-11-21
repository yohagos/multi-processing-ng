import { AfterViewInit, Component, effect, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../services/user-service';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { SkillService } from '../../skill/services/skill-service';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SkillWithDetailsUiData } from '../../models/skill.model';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,

    DatePipe,
  ],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail implements OnInit, AfterViewInit {
  private userService = inject(UserService)
  private skillService = inject(SkillService)

  displayedColumns = ['name', 'category', 'proficiency_level', 'acquired_date']
  dataSource: MatTableDataSource<SkillWithDetailsUiData> = new MatTableDataSource<SkillWithDetailsUiData>([])

  @ViewChild(MatSort) sort: MatSort = new MatSort()

  selectedUser = this.userService.selectedUser
  skillsByUserId = this.skillService.skillsByUserId

  constructor() {
    effect(() => {
      this.dataSource.data = this.skillsByUserId() || []
    })
  }

  ngOnInit(): void {
    this.loadSkillsByUserId()
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
  }

  loadSkillsByUserId() {
    if (this.selectedUser() !== undefined && this.selectedUser()?.id !== undefined) {
      this.skillService.getSkillsByUserId(this.selectedUser()!.id)
    }
  }
}
