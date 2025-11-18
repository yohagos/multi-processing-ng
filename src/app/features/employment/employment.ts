import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

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
export class Employment {
  private readonly _router = inject(Router)
  private route = inject(ActivatedRoute)

  onOverview = signal(false)

  constructor() {
    
    effect(() => {

    })
  }

  /* ngOnInit(): void {
    const stillOnOverview = this.route.snapshot.url.some(segment => segment.path !== 'overview')
    this.onOverview.set(stillOnOverview)
  } */

  navigateTo(route: string) {
    this._router.navigate([route])
  }
}
