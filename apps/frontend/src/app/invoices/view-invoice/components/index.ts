import { EditOverlayComponent } from './edit-invoice-overlay';
import * as fromInvoiceDetail from './invoice-details';
import { InvoiceDetailsActions } from './invoice-details-actions.component';

export const COMPONENTS = [
  fromInvoiceDetail.COMPONENTS,
  InvoiceDetailsActions,
  EditOverlayComponent,
];
