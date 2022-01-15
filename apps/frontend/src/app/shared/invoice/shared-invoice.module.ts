import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {
  GoBackComponent,
  InvoiceIdComponent,
  InvoiceStatusComponent,
  PriceComponent
} from "./components";

const COMPONENTS = [
  InvoiceStatusComponent,
  GoBackComponent,
  InvoiceIdComponent,
  PriceComponent,
];

@NgModule({
  imports: [CommonModule],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
})
export class SharedInvoiceModule {}
