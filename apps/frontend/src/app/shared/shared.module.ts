import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatRippleModule } from "@angular/material/core";
import { RouterModule } from "@angular/router";
import { UIModule } from "@lbk/ui";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { fromInvoiceForm, LogoComponent } from "./components";

export const COMPONENTS = [fromInvoiceForm.COMPONENTS, LogoComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    UIModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatRippleModule,
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
})
export class SharedModule {}
