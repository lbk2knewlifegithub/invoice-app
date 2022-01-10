import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  ConfirmDeactivateDialogComponent,
  ConfirmDeleteDialogComponent
} from "@lbk/ui";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class DialogService {
  constructor(private readonly _dialog: MatDialog) {}

  deleteDialog(id: string): Observable<boolean> {
    return this._dialog
      .open(ConfirmDeleteDialogComponent, {
        data: id,
        disableClose: true,
      })
      .afterClosed();
  }

  confirmDeactivate(): Observable<boolean> {
    return this._dialog
      .open(ConfirmDeactivateDialogComponent, { data: "", disableClose: true })
      .afterClosed();
  }
}
