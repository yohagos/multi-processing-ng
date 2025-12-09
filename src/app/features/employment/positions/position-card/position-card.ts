import { Component, Input } from '@angular/core';
import { PositionUiData } from '../../models/position.model';

@Component({
  selector: 'app-position-card',
  imports: [],
  templateUrl: './position-card.html',
  styleUrl: './position-card.scss',
})
export class PositionCard {
  @Input('position') position!: PositionUiData
}
