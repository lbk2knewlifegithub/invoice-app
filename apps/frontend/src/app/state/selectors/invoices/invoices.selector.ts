import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromInvoices from "../../reducers/invoices/invoices.reducer";

/**
 * Invoices selector
 */
export const selectInvoicesEntitiesState =
  createFeatureSelector<fromInvoices.State>(fromInvoices.invoicesFeatureKey);

export const selectSelectedInvoiceId = createSelector(
  selectInvoicesEntitiesState,
  fromInvoices.selectId
);

export const selectLoadingInvoices = createSelector(
  selectInvoicesEntitiesState,
  fromInvoices.selectLoadingInvoices
);

export const {
  selectIds: selectInvoiceIds,
  selectEntities: selectInvoiceEntities,
  selectAll: selectAllInvoices,
} = fromInvoices.adapter.getSelectors(selectInvoicesEntitiesState);

export const selectSelectedInvoice = createSelector(
  selectInvoiceEntities,
  selectSelectedInvoiceId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);
