import { User } from "@lbk/models";
import { createAction, props } from "@ngrx/store";

/**
 * - Login
 */
export const loginSuccess = createAction(
  "[Auth/API] Login Success",
  props<{ user: User }>()
);

export const loginFailure = createAction(
  "[Auth/API] Login Failure",
  props<{ error: any }>()
);

export const loginRedirect = createAction("[Auth/API] Login Redirect");

/**
 * - Signup
 */
export const signUpSuccess = createAction(
  "[Auth/API] Sign Up Success",
  props<{ user: User }>()
);

export const signUpFailure = createAction(
  "[Auth/API] Sign Up Failure",
  props<{ error: any }>()
);

export const signUpRedirect = createAction("[Auth/API] Sign Up Redirect");
