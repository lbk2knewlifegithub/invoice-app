import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'invoices',
    loadChildren: () =>
      import('@frontend/invoices/invoices-preview').then(
        (m) => m.InvoicesPreviewModule
      ),
  },
  {
    path: 'invoices',
    loadChildren: () =>
      import('@frontend/invoices/view-invoice').then(
        (m) => m.ViewInvoiceModule
      ),
  },
  {
    path: '',
    redirectTo: '/invoices',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      relativeLinkResolution: 'legacy',
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
