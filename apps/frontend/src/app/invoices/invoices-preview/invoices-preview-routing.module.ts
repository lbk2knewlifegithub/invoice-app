import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InvoicePreviewPageComponent } from "./containers";
import { InvoicesPreviewGuard, PendingGuard } from "./guards";

const routes: Routes = [
  {
    path: "",
    component: InvoicePreviewPageComponent,
    canDeactivate: [PendingGuard],
    canActivate: [InvoicesPreviewGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoicesPreviewRoutingModule {}
