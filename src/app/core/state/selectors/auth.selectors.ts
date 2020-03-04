import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducers';
import { authState } from '../reducers/auth.reducers';

export const selectAuthFeature = createFeatureSelector<AuthState>(authState);
export const selectAuthEmailFeature = createFeatureSelector<AuthState>(
  authState
);
export const selectAuthIdFeature = createFeatureSelector<AuthState>(authState);

export const selectAuthEvents = createSelector(
  selectAuthFeature,
  (state: AuthState): any => state.user
);

export const selectAuthIdEvents = createSelector(
  selectAuthIdFeature,
  (state: AuthState): string => state.id
);
