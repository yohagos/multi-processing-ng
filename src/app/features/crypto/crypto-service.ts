import { Injectable, OnDestroy, signal } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { CryptoModel } from './crypto.model';

@Injectable({
  providedIn: 'root'
})
export class CryptoService implements OnDestroy {
  private readonly url = 'ws://localhost:8080/api/crypto/ws'

  private webSocketSubject?: WebSocketSubject<CryptoModel[]>
  readonly data = signal<CryptoModel[]>([])

  connect() {
    this.webSocketSubject = webSocket<CryptoModel[]>(this.url)

    this.webSocketSubject.subscribe({
      next: (msg) => {
       this.data.set(msg)
      }
    })
  }

  ngOnDestroy(): void {
    this.webSocketSubject?.complete()
  }
}
