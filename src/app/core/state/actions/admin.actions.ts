import { Action } from '@ngrx/store';
import { AdminData } from '../../interfaces/admin-data.interface';

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
    constructor(public id: string, public payload: AdminData) {}
  }

export class UpdateGymSuccess implements Action {
    public readonly type: AdminStateActions.UpdateGymSuccess =
      AdminStateActions.UpdateGymSuccess;
  }

export class UpdateGymFailed implements Action {
    public readonly type: AdminStateActions.UpdateGymFailed =
      AdminStateActions.UpdateGymFailed;
      constructor(public payload: Error) {}
    }

export class GettingIdentifier implements Action {
    public readonly type: AdminStateActions.GettingIdentifier =
      AdminStateActions.GettingIdentifier;
    constructor(public id: string) {}
  }

export class RemoveGym implements Action {
  public readonly type: AdminStateActions.RemoveGym =
    AdminStateActions.RemoveGym;
  constructor(public id: string) {}
}

export class RemoveGymSuccess implements Action {
  public readonly type: AdminStateActions.RemoveGymSuccess =
    AdminStateActions.RemoveGymSuccess;
}

export class RemoveGymFailed implements Action {
  public readonly type: AdminStateActions.RemoveGymFailed =
    AdminStateActions.RemoveGymFailed;
    constructor(public payload: Error) {}
  }

export class AddingNewPicture implements Action {
  public readonly type: AdminStateActions.AddingNewPicture =
    AdminStateActions.AddingNewPicture;
  constructor(public payload: string) {}
}

export class LoadAdmin implements Action {
  public readonly type: AdminStateActions.LoadAdmin =
    AdminStateActions.LoadAdmin;
}

export class LoadAdminSuccess implements Action {
  public readonly type: AdminStateActions.LoadAdminSuccess =
    AdminStateActions.LoadAdminSuccess;
  constructor(public payload: boolean) {}
}

export class LoadAdminFailed implements Action {
  public readonly type: AdminStateActions.LoadAdminFailed =
    AdminStateActions.LoadAdminFailed;
    constructor(public payload: Error) {}
  }

export class LoadGymList implements Action {
  public readonly type: AdminStateActions.LoadGymList =
    AdminStateActions.LoadGymList;
}

export class LoadGymListSuccess implements Action {
  public readonly type: AdminStateActions.LoadGymListSuccess =
    AdminStateActions.LoadGymListSuccess;
  constructor(public payload: AdminData[]) {}
}

export class LoadGymListFailed implements Action {
  public readonly type: AdminStateActions.LoadGymListFailed =
    AdminStateActions.LoadGymListFailed;
    constructor(public payload: Error) {}
  }

export class AddNewGym implements Action {
  public readonly type: AdminStateActions.AddNewGym =
    AdminStateActions.AddNewGym;
  constructor(public payload: AdminData) {}
}
export class AddNewGymSuccess implements Action {
  public readonly type: AdminStateActions.AddNewGymSuccess =
    AdminStateActions.AddNewGymSuccess;
}

export class AddNewGymFailed implements Action {
  public readonly type: AdminStateActions.AddNewGymFailed =
    AdminStateActions.AddNewGymFailed;
    constructor(public payload: Error) {}
  }

export class LoadImgUnsplash implements Action {
  public readonly type: AdminStateActions.LoadImgUnsplash =
    AdminStateActions.LoadImgUnsplash;
}

export class LoadImgUnsplashFailed implements Action {
  public readonly type: AdminStateActions.LoadImgUnsplashFailed =
    AdminStateActions.LoadImgUnsplashFailed;
  constructor(public payload: Error) {}
}

export class LoadImgUnsplashSuccess implements Action {
  public readonly type: AdminStateActions.LoadImgUnsplashSuccess =
    AdminStateActions.LoadImgUnsplashSuccess;
  constructor(public payload: string[]) {}
}

export class SearchImgUnsplash implements Action {
  public readonly type: AdminStateActions.SearchImgUnsplash =
    AdminStateActions.SearchImgUnsplash;
  constructor(public payload: string) {}
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
