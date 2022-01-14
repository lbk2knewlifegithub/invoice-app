import { InvoiceDto } from "@frontend/dto";
import { createAction, props } from "@ngrx/store";

export const selectInvoice = createAction(
  "[View Invoice Page] Select Invoice",
  props<{ id: number }>()
);

export const deleteInvoice = createAction(
  "[View Invoice Page] Delete Invoice",
  props<{ id: number }>()
);

export const maskAsPaid = createAction(
  "[View Invoice Page] Mask As Paid",
  props<{ id: number }>()
);

export const updateInvoice = createAction(
  "[View Invoice Page] Update Invoice",
  props<{ id: number; invoiceDto: InvoiceDto }>()
);
