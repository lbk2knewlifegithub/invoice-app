import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MaskAsPaidSnackBarComponent } from "../components";

@Injectable({ providedIn: "root" })
export class SnackBarService {
  durationInSeconds = 5;

  constructor(private _snackBar: MatSnackBar) {}

  maskAsPaid(id: number) {
    this._snackBar.openFromComponent(MaskAsPaidSnackBarComponent, {
      duration: this.durationInSeconds * 1000,
      data: id,
      panelClass: "p-0",
    });
  }
}
