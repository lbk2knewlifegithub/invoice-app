import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromEditInvoice from "../../reducers/invoices/edit-invoice.reducer";
/**
 * - Edit Invoice Page Selector
 */
export const selectEditInvoiceState =
  createFeatureSelector<fromEditInvoice.State>(
    fromEditInvoice.editInvoiceFeatureKey
  );

export const selectEditInvoiceError = createSelector(
  selectEditInvoiceState,
  fromEditInvoice.getError
);

export const selectEditInvoicePending = createSelector(
  selectEditInvoiceState,
  fromEditInvoice.getPending
);
