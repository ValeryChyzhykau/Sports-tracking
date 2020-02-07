import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import { AuthActionTypes } from "../actions/auth.actions";

@Injectable()
export class LoginRedirectEffect {
  @Effect({ dispatch: false })
  public loginRedirect: any = this.actions$.pipe(
    ofType(AuthActionTypes.LoginRedirect),
    tap(() => {
      this.router.navigate(['/login']);
    }),
  );

  @Effect({dispatch: false})
  public homeRedirect: any = this.actions$.pipe(
    ofType(AuthActionTypes.HomeRedirect),
    tap(() => {
      this.router.navigate(['/home']);
    }),
  );

  @Effect({dispatch: false})
  public loginSuccess: any = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    tap(() => {
      this.router.navigate(['/home']);
    }),
  );

  constructor(private actions$: Actions, private router: Router) {}
}
