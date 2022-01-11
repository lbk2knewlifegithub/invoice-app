import {
  InvoicesAPIActions,
  InvoicesPreviewPageActions
} from '@frontend/state/actions';
import { createReducer, on } from '@ngrx/store';

export const searchFeatureKey = 'search';

export interface State {
  ids: string[];
  status: string[];
}

const initialState: State = {
  ids: [],
  status: [],
};

export const reducer = createReducer(
  initialState,
  on(InvoicesPreviewPageActions.filter, (state, { filterDto }) => {
    const { checked, status } = filterDto;

    return {
      ids: [],
      status: checked
        ? [...state.status, status]
        : state.status.filter((f) => f !== status),
    };
  }),
  on(InvoicesAPIActions.searchInvoiceSuccess, (state, { invoices }) => ({
    ids: invoices.map((i) => i._id),
    status: state.status,
  }))
);

export const getIds = (state: State) => state.ids;
export const getStatus = (state: State) => state.status;
