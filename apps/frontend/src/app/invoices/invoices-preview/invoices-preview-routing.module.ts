import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InvoicePreviewPageComponent } from "./containers";
import { PendingGuard } from "./pending.guard";

const routes: Routes = [
  {
    path: "",
    component: InvoicePreviewPageComponent,
    canDeactivate: [PendingGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoicesPreviewRoutingModule {}
