import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatRippleModule } from "@angular/material/core";
import { UIModule } from "@lbk/ui";
import { SharedModule } from "../../shared";
import { COMPONENTS } from "./components";
import { InvoicePreviewPageComponent } from "./containers";
import { InvoicesPreviewRoutingModule } from "./invoices-preview-routing.module";

const CONTAINERS = [InvoicePreviewPageComponent];

@NgModule({
  imports: [
    CommonModule,
    InvoicesPreviewRoutingModule,
    UIModule,
    MatRippleModule,
    SharedModule,
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class InvoicesPreviewModule {}
