import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '@lbk/ui';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private readonly _dialog: MatDialog) {}

  deleteDialog(id: string): Observable<boolean> {
    return this._dialog
      .open(ConfirmDeleteDialogComponent, {
        data: id,
        panelClass: 'delete-dialog',
      })
      .afterClosed();
  }
}
