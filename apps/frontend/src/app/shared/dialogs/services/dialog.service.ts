import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import {
  ConfirmDeactivateDialogComponent,
  ConfirmDeleteDialogComponent,
  FormInvalidDialog,
  LogoutConfirmationDialogComponent
} from "../components";

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

  confirmLogout(): Observable<boolean> {
    return this._dialog
      .open(LogoutConfirmationDialogComponent, { disableClose: true })
      .afterClosed();
  }
}
