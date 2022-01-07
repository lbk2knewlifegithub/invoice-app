import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UIModule } from '@lbk/ui';
import { SharedModule } from '../../shared';
import {
  FilterComponent,
  InvoicePreviewComponent,
  InvoicePreviewListComponent,
  InvoicesPreviewHeaderComponent,
  NewInvoiceComponent,
  NewInvoiceOverlayComponent,
  NoInvoicesComponent,
  TotalInvoicesComponent
} from './components';
import { InvoicePreviewPageComponent } from './containers';
import { InvoicesPreviewRoutingModule } from './invoices-preview-routing.module';

const COMPONENTS = [
  FilterComponent,
  InvoicePreviewComponent,
  InvoicePreviewListComponent,
  InvoicesPreviewHeaderComponent,

  NewInvoiceComponent,
  NewInvoiceOverlayComponent,
  NoInvoicesComponent,
  TotalInvoicesComponent,
];

const CONTAINERS = [InvoicePreviewPageComponent];

@NgModule({
  imports: [CommonModule, InvoicesPreviewRoutingModule, UIModule, SharedModule],
  declarations: [COMPONENTS, CONTAINERS],
})
export class InvoicesPreviewModule {}
