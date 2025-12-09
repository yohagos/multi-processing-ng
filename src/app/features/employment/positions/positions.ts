import { Component, inject, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PositionService } from './services/position-service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { toObservable } from '@angular/core/rxjs-interop';
import { PositionCard } from './position-card/position-card';

@Component({
  selector: 'app-positions',
  imports: [
    MatButtonModule,
    MatProgressBarModule,

    PositionCard,
  ],
  templateUrl: './positions.html',
  styleUrl: './positions.scss',
})
export class Positions implements OnDestroy {
  private positionService = inject(PositionService)
  positions = this.positionService.positionsList

  loading = true

  constructor() {
    toObservable(this.positions).subscribe(data => {
      if (data) {
        this.loading = false
      }
    })
    this.positionService.loadPositionList()
  }

  ngOnDestroy(): void {
    this.loading = true
  }
}
