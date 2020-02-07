import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducers';
import { authState } from '../reducers/auth.reducers';

export const selectAuthFeature = createFeatureSelector<AuthState>(
    authState,
);

export const selectAuthEvents = createSelector(
    selectAuthFeature,
    (state: AuthState): boolean => state.isAuthenticated,
);
