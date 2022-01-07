import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UIModule } from '@lbk/ui';
import { SharedModule } from '../../shared';
import * as fromViewInvoice from './components';
import {
  SelectedInvoicePageComponent,
  ViewInvoicePageComponent
} from './containers';
import { ViewInvoiceRoutingModule } from './view-invoice-routing.module';

const COMPONENTS = [fromViewInvoice.COMPONENTS];

const CONTAINERS = [ViewInvoicePageComponent, SelectedInvoicePageComponent];

@NgModule({
  imports: [CommonModule, ViewInvoiceRoutingModule, UIModule, SharedModule],
  declarations: [COMPONENTS, CONTAINERS],
})
export class ViewInvoiceModule {}
