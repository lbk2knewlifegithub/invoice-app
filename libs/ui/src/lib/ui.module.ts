import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterModule } from "@angular/router";
import {
  CheckboxComponent,
  DropdownComponent,
  GoBackComponent,
  InvoiceIdComponent,
  InvoiceStatusComponent,
  MaskAsPaidSnackBarComponent,
  OverlayComponent,
  PriceComponent
} from "./components";
import * as fromDialogs from "./components/dialogs";
import * as fromForm from "./components/form";
import { ScrollToDirective } from "./directives";
import { DialogService } from "./services";

const COMPONENTS = [
  fromForm.InputArrayComponent,
  fromForm.InputComponent,
  fromDialogs.ConfirmDeleteDialogComponent,
  fromDialogs.ConfirmDeactivateDialogComponent,
  fromDialogs.FormInvalidDialog,
  fromDialogs.LogoutConfirmationDialogComponent,
  MaskAsPaidSnackBarComponent,
  InvoiceStatusComponent,
  GoBackComponent,
  InvoiceIdComponent,
  PriceComponent,
  DropdownComponent,
  CheckboxComponent,
  OverlayComponent,
];

const DIRECTIVES = [ScrollToDirective];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [DialogService],
  declarations: [COMPONENTS, DIRECTIVES],
  exports: [COMPONENTS, DIRECTIVES],
})
export class UIModule {}
