import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { State, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AdminService } from '../../services/admin.service';
import { AdminStateActions, RemoveGym, RemoveGymFailed, RemoveGymSuccess } from '../actions/admin.actions';
import { AppState } from '../reducers';
import { StateAdmin } from '../reducers/admin.reducers';

@Injectable()
export class DeleteGymEffect {
  @Effect({dispatch: false})
  public deleteGym$: Observable<Observable<RemoveGymSuccess>> = this.actions$.pipe(
    ofType(AdminStateActions.RemoveGym),
    map((data: RemoveGym) => {
      return this.adminService.deleteGym(data.id)
      .pipe(
        map(() => {
          return new RemoveGymSuccess();
        }),
      );
    }), catchError((error, caught) => {
      this.store$.dispatch(new RemoveGymFailed(error));
      return caught;
    }),
  );
  constructor(
    private actions$: Actions,
    private adminService: AdminService,
    public state: State<StateAdmin>,
    private store$: Store<AppState>,
  ) {}
}
