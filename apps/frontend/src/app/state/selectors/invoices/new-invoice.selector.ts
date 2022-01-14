import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromNewInvoice from "../../reducers/invoices/new-invoice.reducer";

/**
 * New Invoice Selector
 */
export const selectNewInvoiceState =
  createFeatureSelector<fromNewInvoice.State>(
    fromNewInvoice.newInvoiceFeatureKey
  );

export const selectNewInvoiceError = createSelector(
  selectNewInvoiceState,
  fromNewInvoice.getError
);

export const selectPendingSaveAsDraft = createSelector(
  selectNewInvoiceState,
  fromNewInvoice.getPendingSaveDraft
);

export const selectPendingCreate = createSelector(
  selectNewInvoiceState,
  fromNewInvoice.getPendingCreate
);
