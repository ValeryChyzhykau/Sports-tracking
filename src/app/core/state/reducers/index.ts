import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '@src/environments/environment';
import { adminNode, StateAdmin, stateAdmin } from './admin.reducers';
import { authInformation, authState, AuthState } from './auth.reducers';

export interface State {
     [authState]: AuthState;
     [adminNode]: StateAdmin;
}

export const reducers: ActionReducerMap<State> = {
    [authState]: authInformation,
    [adminNode]: stateAdmin,
};

export const metaReducers: Array<MetaReducer<State>> = !environment.production
  ? []
  : [];
