import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AdminService } from '../../services/admin.service';
import { AdminStateActions, LoadGymListFailed, LoadGymListSuccess } from '../actions/admin.actions';

@Injectable()
export class LoadNewGymEffect {
  @Effect()
  public loadNewGym$: any = this.actions$.pipe(
    ofType(AdminStateActions.LoadGymList),
    mergeMap(() =>
      this.adminService.loadingNewGym().pipe(
        map((data) => {
          return new LoadGymListSuccess(data);
        }),
      ),
    ),
    catchError((error) => of(new LoadGymListFailed(error))),
  );
  constructor(private actions$: Actions, private adminService: AdminService) {}
}
