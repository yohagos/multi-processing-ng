import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  private dialog = inject(MatDialog)

  confirmAction(context: string): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '300px',
      height: '220px',
      data: {
        context
      }
    })

    return dialogRef.afterClosed()
  }
}
