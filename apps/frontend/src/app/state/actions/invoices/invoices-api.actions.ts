import { InvoiceDto } from "@frontend/dto";
import { Invoice } from "@lbk/models";
import { createAction, props } from "@ngrx/store";

/**
 * - Load invoices
 */
export const loadInvoicesSuccess = createAction(
  "[Invoices/API] Load Invoices Success",
  props<{ invoices: Invoice[] }>()
);

export const loadInvoicesFailure = createAction(
  "[Invoices/API] Load Invoices Failure",
  props<{ error: any }>()
);

/**
 * - Delete Invoice
 */
export const deleteInvoiceSuccess = createAction(
  "[Invoices/API] Delete Invoice Success",
  props<{ id: number }>()
);

export const deleteInvoiceFailure = createAction(
  "[Invoices/API] Delete Invoice Failure",
  props<{ error: any }>()
);

/**
 * - Mask Invoice as Paid
 */
export const maskAsPaidSuccess = createAction(
  "[Invoices/API] Mask As Paid Success",
  props<{ id: number }>()
);

export const maskAsPaidFailure = createAction(
  "[Invoices/API] Mask As Paid Failure",
  props<{ error: any }>()
);

/**
 * - Edit Invoice
 */
export const updateInvoiceSuccess = createAction(
  "[Invoices/API] Edit Invoice Success",
  props<{ id: number; invoiceDto: InvoiceDto }>()
);

export const editInvoiceFailure = createAction(
  "[Invoices/API] Edit Invoice Failure",
  props<{ error: any }>()
);

/**
 * - Search Invoice
 */
export const searchInvoiceSuccess = createAction(
  "[Invoices/API] Search Invoice Success",
  props<{ invoices: Invoice[] }>()
);

export const searchInvoiceFailure = createAction(
  "[Invoices/API] Search Invoice Failure",
  props<{ error: any }>()
);

/**
 * - Create Invoice
 */
export const createInvoiceSuccess = createAction(
  "[Invoices/API] Create Invoice Success",
  props<{ invoice: Invoice }>()
);

export const createInvoiceFailure = createAction(
  "[Invoices/API] Create Invoice Failure",
  props<{ error: any }>()
);
