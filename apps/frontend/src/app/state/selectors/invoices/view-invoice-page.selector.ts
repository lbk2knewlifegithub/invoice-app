import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromViewInvoicePage from "../../reducers/invoices/view-invoice-page.reducer";
/**
 * View Invoice Page Selector
 */
export const selectViewInvoicePageState =
  createFeatureSelector<fromViewInvoicePage.State>(
    fromViewInvoicePage.viewInvoicePageFeatureKey
  );
export const selectViewInvoicePageError = createSelector(
  selectViewInvoicePageState,
  fromViewInvoicePage.getError
);
export const selectViewInvoicePagePending = createSelector(
  selectViewInvoicePageState,
  fromViewInvoicePage.getPending
);
