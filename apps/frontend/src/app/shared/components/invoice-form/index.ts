import * as from from "./address-form/address-form.component";
import * as fromBillToForm from "./bill-to";
import { InvoiceFormTitleComponent } from "./invoice-form-title";
import { InvoiceFormComponent } from "./invoice-form.component";
import * as fromItemsForm from "./items-form";

export const COMPONENTS = [
  from.AddressFormComponent,
  fromBillToForm.COMPONENTS,
  InvoiceFormTitleComponent,
  InvoiceFormComponent,
  fromItemsForm.COMPONENTS,
];
