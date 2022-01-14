import { EditOverlayComponent } from './edit-invoice-overlay/edit-overlay.component';
import * as fromInvoiceDetail from './invoice-details';
import { InvoiceDetailsActions } from './invoice-details-actions.component';

export const COMPONENTS = [
  fromInvoiceDetail.COMPONENTS,
  InvoiceDetailsActions,
  EditOverlayComponent,
];
