import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MaskAsPaidSnackBarComponent } from "./components";
import { SnackBarService } from "./snackbar.service";

const COMPONENTS = [MaskAsPaidSnackBarComponent];

@NgModule({
  imports: [CommonModule, MatSnackBarModule],
  declarations: COMPONENTS,
  providers: [SnackBarService],
})
export class SnackBarModule {}
