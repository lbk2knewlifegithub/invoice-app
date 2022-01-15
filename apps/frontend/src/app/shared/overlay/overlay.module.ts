import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedInvoiceModule } from "../invoice";
import { OverlayComponent } from "./overlay.component";

@NgModule({
  imports: [CommonModule, SharedInvoiceModule],
  exports: [OverlayComponent],
  declarations: [OverlayComponent],
})
export class OverlayModule {}
