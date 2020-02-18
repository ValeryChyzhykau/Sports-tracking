import { Action } from '@ngrx/store';

export enum AdminStateActions {
    LoadAdminSuccess = '[Admin] LoadAdminSuccess',
    LoadAdminFailed = '[Admin] LoadAdminFailed',
    LoadAdmin = '[Admin] LoadAdmin',
    LoadGymListFailed = '[Admin] LoadGymListFailed',
    LoadGymListSuccess = '[Admin] LoadGymListSuccess',
    LoadGymList = '[Admin] LoadGymList',
    AddNewGym = '[Admin] AddNewGym',
    AddNewGymSuccess = '[Admin] AddNewGymSuccess',
    AddNewGymFailed = '[Admin] AddNewGymFailed',
    LoadImgUnsplash = '[Admin] LoadImgUnsplash',
    LoadImgUnsplashSuccess = '[Admin] LoadImgUnsplashSuccess',
    LoadImgUnsplashFailed = '[Admin] LoadImgUnsplashFailed',
    SearchImgUnsplash = '[Admin] SearchImgUnsplash',
    AddingNewPicture = '[Admin] AddingNewPicture',
    RemoveGym = '[Admin] RemoveGym',
    RemoveGymSuccess = '[Admin] RemoveGymSuccess',
    RemoveGymFailed = '[Admin] RemoveGymFailed',
    GettingIdentifier = '[Admin] GettingIdentifier',
    UpdateGym = '[Admin] UpdateGym',
    UpdateGymSuccess = '[Admin] UpdateGymSuccess',
    UpdateGymFailed = '[Admin] UpdateGymFailed',
}

export class UpdateGym implements Action {
    public readonly type: AdminStateActions.UpdateGym =
      AdminStateActions.UpdateGym;
    constructor(public id: string, public payload: any) {}
  }

export class UpdateGymSuccess implements Action {
    public readonly type: AdminStateActions.UpdateGymSuccess =
      AdminStateActions.UpdateGymSuccess;
  }

export class UpdateGymFailed implements Action {
    public readonly type: AdminStateActions.UpdateGymFailed =
      AdminStateActions.UpdateGymFailed;
    constructor(public payload: any) {}
  }

export class GettingIdentifier implements Action {
    public readonly type: AdminStateActions.GettingIdentifier =
      AdminStateActions.GettingIdentifier;
    constructor(public id: any) {}
  }

export class RemoveGym implements Action {
  public readonly type: AdminStateActions.RemoveGym =
    AdminStateActions.RemoveGym;
  constructor(public id: any) {}
}

export class RemoveGymSuccess implements Action {
  public readonly type: AdminStateActions.RemoveGymSuccess =
    AdminStateActions.RemoveGymSuccess;
  constructor(public payload: any) {}
}

export class RemoveGymFailed implements Action {
  public readonly type: AdminStateActions.RemoveGymFailed =
    AdminStateActions.RemoveGymFailed;
  constructor(public payload: any) {}
}

export class AddingNewPicture implements Action {
  public readonly type: AdminStateActions.AddingNewPicture =
    AdminStateActions.AddingNewPicture;
  constructor(public payload: any) {}
}

export class LoadAdmin implements Action {
  public readonly type: AdminStateActions.LoadAdmin =
    AdminStateActions.LoadAdmin;
}

export class LoadAdminSuccess implements Action {
  public readonly type: AdminStateActions.LoadAdminSuccess =
    AdminStateActions.LoadAdminSuccess;
  constructor(public payload: any) {}
}

export class LoadAdminFailed implements Action {
  public readonly type: AdminStateActions.LoadAdminFailed =
    AdminStateActions.LoadAdminFailed;
  constructor(public payload: any) {}
}

export class LoadGymList implements Action {
  public readonly type: AdminStateActions.LoadGymList =
    AdminStateActions.LoadGymList;
}

export class LoadGymListSuccess implements Action {
  public readonly type: AdminStateActions.LoadGymListSuccess =
    AdminStateActions.LoadGymListSuccess;
  constructor(public payload: any) {}
}

export class LoadGymListFailed implements Action {
  public readonly type: AdminStateActions.LoadGymListFailed =
    AdminStateActions.LoadGymListFailed;
  constructor(public payload: any) {}
}

export class AddNewGym implements Action {
  public readonly type: AdminStateActions.AddNewGym =
    AdminStateActions.AddNewGym;
  constructor(public payload: any) {}
}

export class AddNewGymFailed implements Action {
  public readonly type: AdminStateActions.AddNewGymFailed =
    AdminStateActions.AddNewGymFailed;
  constructor(public payload: any) {}
}

export class LoadImgUnsplash implements Action {
  public readonly type: AdminStateActions.LoadImgUnsplash =
    AdminStateActions.LoadImgUnsplash;
}

export class LoadImgUnsplashFailed implements Action {
  public readonly type: AdminStateActions.LoadImgUnsplashFailed =
    AdminStateActions.LoadImgUnsplashFailed;
  constructor(public payload: any) {}
}

export class LoadImgUnsplashSuccess implements Action {
  public readonly type: AdminStateActions.LoadImgUnsplashSuccess =
    AdminStateActions.LoadImgUnsplashSuccess;
  constructor(public payload: any) {}
}

export class SearchImgUnsplash implements Action {
  public readonly type: AdminStateActions.SearchImgUnsplash =
    AdminStateActions.SearchImgUnsplash;
  constructor(public payload: any) {}
}

export type AdminUnion =
  | LoadAdmin
  | LoadAdminFailed
  | LoadAdminSuccess
  | LoadGymList
  | LoadGymListSuccess
  | LoadGymListFailed
  | AddNewGym
  | LoadImgUnsplash
  | LoadImgUnsplashSuccess
  | LoadImgUnsplashFailed
  | SearchImgUnsplash
  | AddingNewPicture
  | RemoveGym
  | RemoveGymSuccess
  | RemoveGymFailed
  | AddNewGymFailed
  | UpdateGym
  | UpdateGymSuccess
  | UpdateGymFailed
  | GettingIdentifier;