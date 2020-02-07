import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '@src/environments/environment';
import { authInformation, authState, AuthState } from './auth.reducers';

export interface State {
     [authState]: AuthState;
}

export const reducers: ActionReducerMap<State> = {
    [authState]: authInformation,
};

export const metaReducers: Array<MetaReducer<State>> = !environment.production
  ? []
  : [];
