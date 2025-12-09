import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackbar = inject(MatSnackBar)

  snackbarMessage(msg: string, action: string) {
    this.snackbar.open(msg, action,  {
      duration: 300000,
      panelClass: [`snackbar-${action}`]
    })
  }
}
