import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { State } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AdminService } from '../../services/admin.service';
import { AdminStateActions, LoadImgUnsplashFailed, LoadImgUnsplashSuccess, SearchImgUnsplash } from '../actions/admin.actions';
import { StateAdmin } from '../reducers/admin.reducers';

@Injectable()
export class LoadUnsplashImg {
  @Effect({})
  public loadImg$: any = this.actions$.pipe(
    ofType(AdminStateActions.SearchImgUnsplash),
    mergeMap((data: SearchImgUnsplash) => {
      return  this.adminService.searchPhotos(data.payload).pipe(
        map((unsplash: any) => {
          const result = [];
          unsplash.results.forEach((element: { urls: string }) => {
              return result.push(element.urls);
          });
          return new LoadImgUnsplashSuccess(result);
        }),
      );
    }), catchError((error) => of(new LoadImgUnsplashFailed(error))),
  );
  constructor(private actions$: Actions, private adminService: AdminService , public state: State<StateAdmin>) {}
}
