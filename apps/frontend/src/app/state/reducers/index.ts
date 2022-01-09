import { InjectionToken } from "@angular/core";
import * as fromRouter from "@ngrx/router-store";
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from "@ngrx/store";
import { environment } from "../../../environments/environment";
import * as fromInvoices from "./invoices";
import * as fromLayout from "./layout";
import * as fromSearch from "./search.reducer";

export interface State {
  [fromLayout.layoutFeatureKey]: fromLayout.State;
  [fromInvoices.invoicesFeatureKey]: fromInvoices.State;
  [fromSearch.searchFeatureKey]: fromSearch.State;
  router: fromRouter.RouterReducerState<any>;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
>("Root reducers token", {
  factory: () => ({
    [fromLayout.layoutFeatureKey]: fromLayout.reducer,
    [fromInvoices.invoicesFeatureKey]: fromInvoices.reducer,
    [fromSearch.searchFeatureKey]: fromSearch.reducer,
    router: fromRouter.routerReducer,
  }),
});

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log("prev state", state);
    console.log("action", action);
    console.log("next state", result);
    console.groupEnd();

    return result;
  };
}

/**
 * Invoices selector
 */
export const selectInvoicesEntitiesState =
  createFeatureSelector<fromInvoices.State>(fromInvoices.invoicesFeatureKey);

export const selectSelectedInvoiceId = createSelector(
  selectInvoicesEntitiesState,
  fromInvoices.selectId
);

export const {
  selectIds: selectInvoiceIds,
  selectEntities: selectInvoiceEntities,
  selectAll: selectAllInvoices,
  selectTotal: selectTotalInvoices,
} = fromInvoices.adapter.getSelectors(selectInvoicesEntitiesState);

export const selectSelectedInvoice = createSelector(
  selectInvoiceEntities,
  selectSelectedInvoiceId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);
/**
 * Layout selector
 */
export const selectLayoutState = createFeatureSelector<fromLayout.State>(
  fromLayout.layoutFeatureKey
);

export const selectShowEditOverlay = createSelector(
  selectLayoutState,
  fromLayout.getShowEditOverlay
);

export const selectShowNewInvoiceOverlay = createSelector(
  selectLayoutState,
  fromLayout.getShowNewInvoiceOverlay
);

export const selectShowOverlay = createSelector(
  selectLayoutState,
  fromLayout.getShowOverlay
);

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
  selectAllInvoices,
  selectSearchInvoiceStatus,
  (invoices, status) => {
    if (status.length === 0) return invoices;
    return invoices.filter((invoice) => status.includes(invoice.status));
  }
);

/**
 * Router selector
 */
export const { selectRouteData } = fromRouter.getSelectors();

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];
