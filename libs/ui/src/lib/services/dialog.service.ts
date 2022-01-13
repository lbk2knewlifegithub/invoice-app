import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  ConfirmDeactivateDialogComponent,
  ConfirmDeleteDialogComponent
} from "@lbk/ui";
import { Observable } from "rxjs";
import { FormInvalidDialog } from "../components";

@Injectable({ providedIn: "root" })
export class DialogService {
  constructor(private readonly _dialog: MatDialog) {}

  formInvalid(): Observable<boolean> {
    return this._dialog
      .open(FormInvalidDialog, {
        disableClose: true,
      })
      .afterClosed();
  }

  deleteDialog(id: number): Observable<boolean> {
    return this._dialog
      .open(ConfirmDeleteDialogComponent, {
        data: id,
        disableClose: true,
      })
      .afterClosed();
  }

  confirmDeactivate(): Observable<boolean> {
    return this._dialog
      .open(ConfirmDeactivateDialogComponent, { disableClose: true })
      .afterClosed();
  }
}
