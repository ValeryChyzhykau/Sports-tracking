import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { State, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AdminService } from '../../services/admin.service';
import { AdminStateActions, UpdateGym, UpdateGymFailed, UpdateGymSuccess } from '../actions/admin.actions';
import { AppState } from '../reducers';
import { StateAdmin } from '../reducers/admin.reducers';

@Injectable()
export class UpdateGymEffect {
  @Effect({ dispatch: false })
  public updateGym$: Observable<boolean | Observable<UpdateGymSuccess>> = this.actions$.pipe(
    ofType(AdminStateActions.UpdateGym),
    map((data: UpdateGym) =>
      this.adminService.updateGym(data.id, data.payload).pipe(
        map(() => {
          return new UpdateGymSuccess();
        }),
      ),
    ),
    catchError((error, caught) => {
      this.store$.dispatch(new UpdateGymFailed(error));
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
