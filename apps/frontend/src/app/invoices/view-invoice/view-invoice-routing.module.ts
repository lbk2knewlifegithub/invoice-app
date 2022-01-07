import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewInvoicePageComponent } from './containers';
import { InvoiceExistsGuard } from './guards';

const routes: Routes = [
  {
    path: ':id',
    component: ViewInvoicePageComponent,
    canActivate: [InvoiceExistsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewInvoiceRoutingModule {}
