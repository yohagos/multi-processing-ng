import { Component, signal } from '@angular/core';
import { Crypto } from './features/crypto/crypto';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Toolbar } from './shared/toolbar/toolbar';


@Component({
  selector: 'app-root',
  imports: [
    Toolbar
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('multi-processing-ng');
}
