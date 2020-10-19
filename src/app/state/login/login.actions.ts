import { createAction, props } from "@ngrx/store";

export const loadLogin = createAction(
  "[Login] load login",
  props<{ name: string }>()
);

export const loginSuccess = createAction(
  "[Login] login success",
  props<{ loggedIn: boolean }>()
);

export const loginError = createAction(
  "[Login] login error",
  props<{ message: string }>()
);
