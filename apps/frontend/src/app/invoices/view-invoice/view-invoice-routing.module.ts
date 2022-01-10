import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InvoiceFormGuard } from "@frontend/shared/components/guards";
import { ViewInvoicePageComponent } from "./containers";
import { InvoiceExistsGuard } from "./guards";

const routes: Routes = [
  {
    path: ":id",
    component: ViewInvoicePageComponent,
    canActivate: [InvoiceExistsGuard],
    canDeactivate: [InvoiceFormGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [InvoiceFormGuard],
})
export class ViewInvoiceRoutingModule {}
