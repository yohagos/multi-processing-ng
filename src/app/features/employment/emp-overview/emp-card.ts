import { Component, inject, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { EmpCardModel } from "../models/emp-card.model";
import { Router } from "@angular/router";


@Component({
  selector: 'app-emp-card',
  imports: [
    MatCardModule,

  ],
  template: `
  <div class="click-container" (click)="navigateTo(cardInfo.link)">
    <mat-card class="card-item">
      <mat-card-header>
        <p class="card-headline">{{cardInfo.title}}</p>
      </mat-card-header>
      <mat-card-content>
        @if (cardInfo.image) {
          <div class="image">
          <img src="{{cardInfo.image}}" alt="" srcset="">
        </div>
        }
        <div class="description">
          {{cardInfo.description}}
        </div>
      </mat-card-content>
    </mat-card>
  </div>
  `,
  styles: `
    mat-card {
      margin: 1em auto;
      width: 30em;

      .image,
      .description {
        margin: 1.2em;
      }
    }

    .card-item:hover {
      cursor: pointer;

      background-color: #1010cf40;
      transition: background-color ease 1s;
    }

    .card-headline {
      font-size: 18px;
      font-weight: 400;
    }
  `,
})
export class EmpCard {
  private readonly _router = inject(Router)

  @Input() cardInfo!: EmpCardModel

  navigateTo(route?: string) {
    if (route) this._router.navigate([route])
  }
}
