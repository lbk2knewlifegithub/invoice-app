import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DialogsModule, SharedInvoiceModule } from "@frontend/shared";
import { InvoiceFormModule } from "@frontend/shared/invoice-form";
import { InvoicePipesModule } from "@frontend/shared/invoice-pipes";
import { OverlayModule } from "@frontend/shared/overlay";
import { CheckboxModule, DropdownModule, LoadingModule } from "@lbk/ui";
import { StoreModule } from "@ngrx/store";
import { FingerprintSpinnerModule } from "angular-epic-spinners";
import { COMPONENTS } from "./components";
import { InvoicePreviewPageComponent } from "./containers";
import { InvoicesPreviewRoutingModule } from "./invoices-preview-routing.module";
import * as fromInvoicesPreviewPage from "./reducers";

const CONTAINERS = [InvoicePreviewPageComponent];

@NgModule({
  imports: [
    CommonModule,
    InvoicesPreviewRoutingModule,
    DropdownModule,
    SharedInvoiceModule,
    DialogsModule,
    LoadingModule,
    FingerprintSpinnerModule,
    InvoicePipesModule,
    InvoiceFormModule,
    OverlayModule,
    CheckboxModule,
    StoreModule.forFeature({
      name: fromInvoicesPreviewPage.invoicesPreviewPage,
      reducer: fromInvoicesPreviewPage.reducer,
    }),
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class InvoicesPreviewModule {}
