import { AuthApiActions } from "@frontend/state/actions";
import { SignUpPageActions } from "./actions";
import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on
} from "@ngrx/store";

export const signUpPageFeatureKey = "signUpPage";

export interface State {
  error: string | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export const reducer = createReducer(
  initialState,
  on(SignUpPageActions.signUp, (state) => ({
    ...state,
    error: null,
    pending: true,
  })),

  on(AuthApiActions.signUpSuccess, (state) => ({
    ...state,
    error: null,
    pending: false,
  })),
  on(AuthApiActions.signUpFailure, (state, { error }) => ({
    ...state,
    error,
    pending: false,
  }))
);

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;

/**
 * Sign Up Page Selector
 */
export const selectSignUpPageState =
  createFeatureSelector<State>(signUpPageFeatureKey);
export const selectSignUpPageError = createSelector(
  selectSignUpPageState,
  getError
);
export const selectSignUpPagePending = createSelector(
  selectSignUpPageState,
  getPending
);
