import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicePreviewPageComponent } from './containers';

const routes: Routes = [{ path: '', component: InvoicePreviewPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoicesPreviewRoutingModule {}
