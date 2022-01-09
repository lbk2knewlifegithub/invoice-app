import * as fromInvoiceList from "./invoice-preview-list";
import * as fromHeader from "./invoices-preview-header";
import { NewInvoiceOverlayComponent } from "./new-invoice-overlay";
import { NoInvoicesComponent } from "./no-invoices.component";

export const COMPONENTS = [
  fromInvoiceList.COMPONENTS,
  fromHeader.COMPONENTS,
  NewInvoiceOverlayComponent,
  NoInvoicesComponent,
];
