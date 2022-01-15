import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewInvoicePageComponent } from "./containers";
import { InvoiceExistsGuard, InvoiceFormGuard, PendingGuard } from "./guards";
import { ViewInvoiceResolver } from "./view-invoice.resolver";

const routes: Routes = [
  {
    path: ":id",
    component: ViewInvoicePageComponent,
    canActivate: [InvoiceExistsGuard],
    canDeactivate: [InvoiceFormGuard, PendingGuard],
    resolve: { invoice: ViewInvoiceResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [InvoiceFormGuard, ViewInvoiceResolver],
})
export class ViewInvoiceRoutingModule {}
