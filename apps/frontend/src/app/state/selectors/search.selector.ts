import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromSearch from "../reducers/search.reducer";
import * as fromInvoices from "./invoices/invoices.selector";
/**
 * Search selector
 */
export const selectSearchState = createFeatureSelector<fromSearch.State>(
  fromSearch.searchFeatureKey
);

export const selectSearchInvoiceIds = createSelector(
  selectSearchState,
  fromSearch.getIds
);

export const selectSearchInvoiceStatus = createSelector(
  selectSearchState,
  fromSearch.getStatus
);

export const selectSearchResult = createSelector(
  fromInvoices.selectAllInvoices,
  selectSearchInvoiceStatus,
  (invoices, status) => {
    if (status.length === 0) return invoices;
    return invoices.filter((invoice) => status.includes(invoice.status));
  }
);

export const selectTotalInvoices = createSelector(
  selectSearchResult,
  (invoices) => invoices.length
);
