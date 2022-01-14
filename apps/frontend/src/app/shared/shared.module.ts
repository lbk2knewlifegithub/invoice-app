import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatRippleModule } from "@angular/material/core";
import { RouterModule } from "@angular/router";
import { UIModule } from "@lbk/ui";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { fromInvoiceForm } from "./components";
import { TotalPriceInvoicePipe, TotalPriceItemPipe } from "./pipes";

export const COMPONENTS = [fromInvoiceForm.COMPONENTS];
export const PIPES = [TotalPriceInvoicePipe, TotalPriceItemPipe];

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
  declarations: [COMPONENTS, PIPES],
  providers: [PIPES],
  exports: [COMPONENTS, PIPES],
})
export class SharedModule {}
