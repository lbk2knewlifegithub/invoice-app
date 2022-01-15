import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import {
  ConfirmDeactivateDialogComponent,
  ConfirmDeleteDialogComponent,
  FormInvalidDialog,
  LogoutConfirmationDialogComponent
} from "./components";
import { DialogService } from "./services";

const COMPONENTS = [
  ConfirmDeactivateDialogComponent,
  ConfirmDeleteDialogComponent,
  FormInvalidDialog,
  LogoutConfirmationDialogComponent,
];

@NgModule({
  imports: [CommonModule, MatDialogModule],
  declarations: COMPONENTS,
  providers: [DialogService],
})
export class DialogsModule {}
