import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LoginAction = '[Auth] LoginAction',
  LoginSuccessAction = '[Auth] Login SuccessAction',
  LoginFailureAction = '[Auth] Login FailureAction',
  LogoutAction = '[Auth] LogoutAction',
  LogoutSuccessAction = '[Auth] LogoutSuccessAction',
  LogoutFailedAction = '[Auth] Logout LogoutFailedAction',
  LoginRedirectAction = '[Auth] Login RedirectAction',
  SignUpAction = '[Auth] Sign UpAction',
  SignUpSuccessAction = '[Auth] Sign Up SuccessAction',
  SignUpFailureAction = '[Auth] Sign Up FailureAction',
  HomeRedirectAction = '[Auth] Home RedirectAction'
}

export class HomeRedirectAction implements Action {
  public readonly type: AuthActionTypes.HomeRedirectAction =
    AuthActionTypes.HomeRedirectAction;
}

export class LogInAction implements Action {
  public readonly type: AuthActionTypes.LoginAction =
    AuthActionTypes.LoginAction;
  constructor(public payload: { email: string; password: string }) {}
}

export class LogInSuccessAction implements Action {
  public readonly type: AuthActionTypes.LoginSuccessAction =
    AuthActionTypes.LoginSuccessAction;
  constructor(public payload: { id: string; user: string; email: string }) {}
}

export class LogInFailureAction implements Action {
  public readonly type: AuthActionTypes.LoginFailureAction =
    AuthActionTypes.LoginFailureAction;
  constructor(public payload: Error) {}
}

export class LogOutAction implements Action {
  public readonly type: AuthActionTypes.LogoutAction =
    AuthActionTypes.LogoutAction;
}
export class LogoutSuccessAction implements Action {
  public readonly type: AuthActionTypes.LogoutSuccessAction =
    AuthActionTypes.LogoutSuccessAction;
  constructor(public payload: { id: null; user: null }) {}
}
export class LogoutFailedAction implements Action {
  public readonly type: AuthActionTypes.LogoutFailedAction =
    AuthActionTypes.LogoutFailedAction;
  constructor(public payload: Error) {}
}

export class LoginRedirectAction implements Action {
  public readonly type: AuthActionTypes.LoginRedirectAction =
    AuthActionTypes.LoginRedirectAction;
}

export class SignUpAction implements Action {
  public readonly type: AuthActionTypes.SignUpAction =
    AuthActionTypes.SignUpAction;
  constructor(
    public auth: {
      email: string;
      password: string;
      phone: number;
      userName: string;
      login: string;
    }
  ) {}
}

export class SignUpSuccessAction implements Action {
  public readonly type: AuthActionTypes.SignUpSuccessAction =
    AuthActionTypes.SignUpSuccessAction;
  constructor(public payload: { id: string; user: string; email: string }) {}
}

export class SignUpFailureAction implements Action {
  public readonly type: AuthActionTypes.SignUpFailureAction =
    AuthActionTypes.SignUpFailureAction;
  constructor(public payload: Error) {}
}

export type AuthActionsUnion =
  | LogInAction
  | LogInSuccessAction
  | LogInFailureAction
  | LogOutAction
  | LoginRedirectAction
  | SignUpAction
  | SignUpSuccessAction
  | SignUpFailureAction
  | LogoutSuccessAction
  | LogoutFailedAction;
