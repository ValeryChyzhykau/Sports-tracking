import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { State } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AdminService } from '../../services/admin.service';
import { AdminStateActions, UpdateGym, UpdateGymFailed, UpdateGymSuccess } from '../actions/admin.actions';
import { StateAdmin } from '../reducers/admin.reducers';

@Injectable()
export class UpdateGymEffect {
  @Effect({ dispatch: false })
  public updateGym$: any = this.actions$.pipe(
    ofType(AdminStateActions.UpdateGym),
    map((data: UpdateGym) =>
      this.adminService.updateGym(data.id, data.payload).pipe(
        map(() => {
          return new UpdateGymSuccess();
        }),
      ),
    ),
    catchError((error) => of(new UpdateGymFailed(error))),
  );

  constructor(
    private actions$: Actions,
    private adminService: AdminService,
    public state: State<StateAdmin>,
  ) {}
}
