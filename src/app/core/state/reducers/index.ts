import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '@src/environments/environment';
import { adminNode, StateAdmin, stateAdmin } from './admin.reducers';
import { authInformation, authState, AuthState } from './auth.reducers';
import { StateUser, stateUser, userNode } from './user.reducers';

export interface AppState {
     [authState]: AuthState;
     [adminNode]: StateAdmin;
     [userNode]: StateUser;
}

export const reducers: ActionReducerMap<AppState> = {
    [authState]: authInformation,
    [adminNode]: stateAdmin,
    [userNode]: stateUser,
};

export const metaReducers: Array<MetaReducer<AppState>> = !environment.production
  ? []
  : [];
