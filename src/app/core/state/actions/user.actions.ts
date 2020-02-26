import { AdminData } from '@modules/home/interfaces/admin-data.interface';
import { UserData } from '@modules/home/interfaces/user-data.interface';
import { Action } from '@ngrx/store';

export enum UserStateActions {
    LoadReservationListFailed = '[User] LoadReservationListFailed',
    LoadReservationListSuccess = '[User] LoadReservationListSuccess',
    LoadReservationList = '[User]  LoadReservationList',
    AddNewReservation = '[User] AddNewReservation',
    AddNewReservationSuccess = '[User] AddNewReservationSuccess',
    AddNewReservationFailed = '[User]  AddNewReservationFailed',
    RemoveReservation = '[User] RemoveReservation',
    RemoveReservationSuccess = '[User] RemoveReservationSuccess',
    RemoveReservationFailed = '[User] RemoveReservationFailed',
    UpdateReservation = '[User] UpdateReservation',
    UpdateReservationSuccess = '[User] UpdateReservationSuccess',
    UpdateReservationFailed = '[User] UpdateReservationFailed',
    GettingInformationAboutTheSelectedGym = '[User] GettingInformationAboutTheSelectedGym',
    GettingPrice = '[User]  GettingPrice',
    GettingSelectedReservation = '[User] GettingSelectedReservation',
    GettingSelectedReservationSuccess = '[User] GettingSelectedReservationSuccess',
    GettingSelectedReservationFailed = '[User] GettingSelectedReservationFailed',
}

export class LoadReservationList implements Action {
    public readonly type: UserStateActions.LoadReservationList =
    UserStateActions.LoadReservationList;
  }

export class LoadReservationListSuccess implements Action {
    public readonly type: UserStateActions.LoadReservationListSuccess =
      UserStateActions.LoadReservationListSuccess;
    constructor(public payload: UserData[]) {}
  }

export class LoadReservationListFailed implements Action {
    public readonly type: UserStateActions.LoadReservationListFailed =
      UserStateActions.LoadReservationListFailed;
      constructor(public payload: Error) {}
    }

export class AddNewReservation implements Action {
    public readonly type: UserStateActions.AddNewReservation =
      UserStateActions.AddNewReservation;
    constructor(public payload: UserData) {}
  }

export class AddNewReservationSuccess implements Action {
    public readonly type: UserStateActions.AddNewReservationSuccess =
    UserStateActions.AddNewReservationSuccess;
    constructor(public payload: AdminData) {}
  }

export class AddNewReservationFailed implements Action {
    public readonly type: UserStateActions.AddNewReservationFailed =
      UserStateActions.AddNewReservationFailed;
      constructor(public payload: Error) {}
    }

export class RemoveReservation implements Action {
    public readonly type: UserStateActions.RemoveReservation =
      UserStateActions.RemoveReservation;
    constructor(public payload: any) {}
  }

export class RemoveReservationSuccess implements Action {
    public readonly type: UserStateActions.RemoveReservationSuccess =
    UserStateActions.RemoveReservationSuccess;
  }

export class RemoveReservationFailed implements Action {
    public readonly type: UserStateActions.RemoveReservationFailed =
      UserStateActions.RemoveReservationFailed;
      constructor(public payload: Error) {}
    }

export class UpdateReservation implements Action {
    public readonly type: UserStateActions.UpdateReservation =
      UserStateActions.UpdateReservation;
    constructor(public id: string, public payload: UserData) {}
  }

export class UpdateReservationSuccess implements Action {
    public readonly type: UserStateActions.UpdateReservationSuccess =
    UserStateActions.UpdateReservationSuccess;
  }

export class UpdateReservationFailed implements Action {
    public readonly type: UserStateActions.UpdateReservationFailed =
      UserStateActions.UpdateReservationFailed;
      constructor(public payload: Error) {}
    }

export class GettingInformationAboutTheSelectedGym implements Action {
    public readonly type: UserStateActions.GettingInformationAboutTheSelectedGym =
    UserStateActions.GettingInformationAboutTheSelectedGym;
    constructor(public payload: AdminData) {}
  }

export class GettingSelectedReservation implements Action {
    public readonly type: UserStateActions. GettingSelectedReservation =
    UserStateActions. GettingSelectedReservation;
    constructor(public payload: UserData) {}
  }
export class GettingSelectedReservationSuccess implements Action {
    public readonly type: UserStateActions. GettingSelectedReservationSuccess =
    UserStateActions. GettingSelectedReservationSuccess;
    constructor(public payload: number[]) {}
  }
export class GettingSelectedReservationFailed implements Action {
    public readonly type: UserStateActions. GettingSelectedReservationFailed =
    UserStateActions. GettingSelectedReservationFailed;
    constructor(public payload: Error) {}
  }

export type UserUnion =
| LoadReservationList
| LoadReservationListSuccess
| LoadReservationListFailed
| AddNewReservation
| AddNewReservationSuccess
| AddNewReservationFailed
| RemoveReservation
| RemoveReservationSuccess
| RemoveReservationFailed
| UpdateReservation
| UpdateReservationSuccess
| UpdateReservationFailed
| GettingInformationAboutTheSelectedGym
| GettingSelectedReservation
| GettingSelectedReservationSuccess
| GettingSelectedReservationFailed;
