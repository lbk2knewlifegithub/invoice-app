import * as fromAddressForm from './address-form';
import * as fromBillToForm from './bill-to-form';
import { InvoiceFormTitleComponent } from './invoice-form-title';
import { InvoiceFormComponent } from './invoice-form.component';
import * as fromItemsForm from './items-form';

export const COMPONENTS = [
  fromAddressForm.COMPONENTS,
  fromBillToForm.COMPONENTS,
  InvoiceFormTitleComponent,
  InvoiceFormComponent,
  fromItemsForm.COMPONENTS,
];
