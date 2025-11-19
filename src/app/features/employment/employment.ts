import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-employment',
  imports: [
     MatToolbarModule,
     MatButtonModule,
     MatIconModule,

     RouterOutlet,
  ],
  templateUrl: './employment.html',
  styleUrl: './employment.scss',
})
export class Employment implements OnInit {
  private readonly _router = inject(Router)

  isOverview = signal(true)

  ngOnInit(): void {
    this._router.events.pipe(
      filter(ev => ev instanceof NavigationEnd)
    ).subscribe((ev: NavigationEnd) => {
      this.isOverview.set(
        ev.url === '/employment/overview'
      )
    })
  }

  navigateTo(route: string) {
    this._router.navigate([route])
  }
}
