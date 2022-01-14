import { FilterDto, InvoiceDto } from "@frontend/dto";
import { createAction, props } from "@ngrx/store";

export const enter = createAction("[Invoices Preview Page] Enter");

export const filter = createAction(
  "[Invoices Preview Page] Filter",
  props<{ filterDto: FilterDto }>()
);

export const createInvoice = createAction(
  "[Invoices Preview Page] Create Invoice",
  props<{ invoiceDto: InvoiceDto }>()
);
