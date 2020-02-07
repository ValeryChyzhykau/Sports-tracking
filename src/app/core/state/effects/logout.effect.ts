import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { AuthActionTypes } from '../actions/auth.actions';

@Injectable()
export class LogoutEffect {
  @Effect({ dispatch: false })
  public logout$: any = this.actions$.pipe(
      ofType(AuthActionTypes.Logout),
      tap(() =>
      this.authService.logout()),
  ).pipe(map(() => this.router.navigate(['/login'])));
constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
  ) {}
}
