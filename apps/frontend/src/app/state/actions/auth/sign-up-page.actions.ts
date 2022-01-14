import { Credentials } from "@lbk/models";
import { createAction, props } from "@ngrx/store";

export const signUp = createAction(
  "[SignUp Page] SignUp",
  props<{ credentials: Credentials }>()
);
