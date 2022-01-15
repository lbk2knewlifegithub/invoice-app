import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DialogsModule, SharedInvoiceModule } from "@frontend/shared";
import { InvoiceFormModule } from "@frontend/shared/invoice-form";
import { InvoicePipesModule } from "@frontend/shared/invoice-pipes";
import { OverlayModule } from "@frontend/shared/overlay";
import { LoadingModule } from "@lbk/ui";
import * as fromViewInvoice from "./components";
import {
  SelectedInvoicePageComponent,
  ViewInvoicePageComponent
} from "./containers";
import { ViewInvoiceRoutingModule } from "./view-invoice-routing.module";

const COMPONENTS = [fromViewInvoice.COMPONENTS];

const CONTAINERS = [ViewInvoicePageComponent, SelectedInvoicePageComponent];

@NgModule({
  imports: [
    CommonModule,
    ViewInvoiceRoutingModule,
    DialogsModule,
    LoadingModule,
    InvoiceFormModule,
    InvoicePipesModule,
    SharedInvoiceModule,
    OverlayModule,
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class ViewInvoiceModule {}
