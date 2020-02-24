import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  Logout = '[Auth] Logout',
  LogoutSuccess = '[Auth] LogoutSuccess',
  LogoutFailed = '[Auth] Logout LogoutFailed',
  LoginRedirect = '[Auth] Login Redirect',
  SignUp = '[Auth] Sign Up',
  SignUpSuccess = '[Auth] Sign Up Success',
  SignUpFailure = '[Auth] Sign Up Failure',
  HomeRedirect = '[Auth] Home Redirect',
}

export class HomeRedirect implements Action {
  public readonly type: AuthActionTypes.HomeRedirect = AuthActionTypes.HomeRedirect;
}

export class LogIn implements Action {
  public readonly type: AuthActionTypes.Login = AuthActionTypes.Login;
  constructor(public payload: any) {}
}

export class LogInSuccess implements Action {
  public readonly type: AuthActionTypes.LoginSuccess =
    AuthActionTypes.LoginSuccess;
  constructor(public payload: any) {}
}

export class LogInFailure implements Action {
  public readonly type: AuthActionTypes.LoginFailure =
    AuthActionTypes.LoginFailure;
    constructor(public payload: Error) {}
}

export class LogOut implements Action {
  public readonly type: AuthActionTypes.Logout = AuthActionTypes.Logout;
}
export class LogoutSuccess implements Action {
  public readonly type: AuthActionTypes.LogoutSuccess = AuthActionTypes.LogoutSuccess;
  constructor(public payload: any) {}
}
export class LogoutFailed  implements Action {
  public readonly type: AuthActionTypes.LogoutFailed  = AuthActionTypes.LogoutFailed;
  constructor(public payload: Error) {}

}

export class LoginRedirect implements Action {
  public readonly type: AuthActionTypes.LoginRedirect =
    AuthActionTypes.LoginRedirect;
}

export class SignUp implements Action {
  public readonly type: AuthActionTypes.SignUp = AuthActionTypes.SignUp;
  constructor(public payload: any) {}
}

export class SignUpSuccess implements Action {
  public readonly type: AuthActionTypes.SignUpSuccess =
    AuthActionTypes.SignUpSuccess;
    constructor(public payload: any) {}
}

export class SignUpFailure implements Action {
  public readonly type: AuthActionTypes.SignUpFailure =
    AuthActionTypes.SignUpFailure;
    constructor(public payload: Error) {}
}

export type All =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | LogOut
  | LoginRedirect
  | SignUp
  | SignUpSuccess
  | SignUpFailure
  | LogoutSuccess
  | LogoutFailed;
