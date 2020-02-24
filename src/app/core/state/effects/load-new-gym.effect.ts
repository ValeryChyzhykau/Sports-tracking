import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AdminData } from '../../interfaces/admin-data.interface';
import { AdminService } from '../../services/admin.service';
import { AdminStateActions, LoadGymListFailed, LoadGymListSuccess } from '../actions/admin.actions';
import { AppState } from '../reducers';

@Injectable()
export class LoadNewGymEffect {
  @Effect()
  public loadNewGym$: Observable<LoadGymListSuccess> = this.actions$.pipe(
    ofType(AdminStateActions.LoadGymList),
    mergeMap(() =>
      this.adminService.loadingNewGym().pipe(
        map((data: AdminData[]) => {
          return new LoadGymListSuccess(data);
        }),
      ),
    ),
    catchError((error, caught) => {
      this.store$.dispatch(new LoadGymListFailed(error));
      return caught;
    }),
  );
  constructor(private actions$: Actions, private adminService: AdminService, private store$: Store<AppState>) {}
}
