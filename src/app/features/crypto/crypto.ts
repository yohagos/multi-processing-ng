import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CryptoService } from './crypto-service';
import { CryptoModel } from './crypto.model';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-crypto',
  imports: [
    MatButtonModule,
    MatChipsModule,
  ],
  templateUrl: './crypto.html',
  styleUrl: './crypto.scss',
})
export class Crypto implements OnInit, OnDestroy {
  private cryptoService = inject(CryptoService)

  messages = signal<CryptoModel[]>([])

  constructor() {
    this.cryptoService.connect()
  }

  getShadow(current: number, previous: number) {
    return current > previous ? 'shd-positive' : 'shd-negative'
  }

  ngOnInit() {
    this.messages = this.cryptoService.data
  }

  ngOnDestroy(): void {
    this.cryptoService.ngOnDestroy()
  }
}
