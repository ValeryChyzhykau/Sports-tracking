import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import { AuthService } from '../../services/auth.service';
import { AuthActionTypes } from "../actions/auth.actions";

@Injectable()
export class LoginRedirectEffect {
  @Effect({dispatch: false})
  public loginSuccess: any = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    tap(() => {
      this.router.navigate(['/']);
    }),
  );

  constructor(private actions$: Actions, private router: Router, private authService: AuthService) {}
}
