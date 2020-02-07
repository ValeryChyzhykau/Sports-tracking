import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { AuthActionTypes } from '../actions/auth.actions';

@Injectable()
export class SignUpRedirect {
  @Effect({dispatch: false})
  public signUpRedierct: any = this.actions$.pipe(
    ofType(AuthActionTypes.SignUpSuccess),
    tap(() => this.router.navigate(["/home"])),
  );
  constructor(private actions$: Actions, private router: Router) {}
}
