import { AuthActions, AuthApiActions } from "@frontend/state/actions";
import { User } from "@lbk/models";
import { createReducer, on } from "@ngrx/store";

export const statusFeatureKey = "status";

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
};

export const reducer = createReducer(
  initialState,
  on(AuthApiActions.loginSuccess, (state, { user }) => ({ ...state, user })),
  on(AuthActions.logout, () => initialState)
);

export const getUser = (state: State) => state.user;
