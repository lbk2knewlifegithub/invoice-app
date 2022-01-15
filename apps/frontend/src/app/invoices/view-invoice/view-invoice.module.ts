import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DialogsModule, SharedInvoiceModule } from "@frontend/shared";
import { InvoiceFormModule } from "@frontend/shared/invoice-form";
import { InvoicePipesModule } from "@frontend/shared/invoice-pipes";
import { OverlayModule } from "@frontend/shared/overlay";
import { LoadingModule } from "@lbk/ui";
import { StoreModule } from "@ngrx/store";
import { COMPONENTS } from "./components";
import { ViewInvoicePageComponent } from "./containers";
import * as fromViewInvoicePage from "./reducers";
import { ViewInvoiceRoutingModule } from "./view-invoice-routing.module";

const CONTAINERS = [ViewInvoicePageComponent];
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
    StoreModule.forFeature({
      name: fromViewInvoicePage.viewInvoicePageFeatureKey,
      reducer: fromViewInvoicePage.reducer,
    }),
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class ViewInvoiceModule {}
