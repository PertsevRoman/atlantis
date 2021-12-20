import {createFeatureSelector, createSelector} from '@ngrx/store';

export const atlantisSelector = createFeatureSelector<AtlantisState>('atlantis')
export const selectRepositories = createSelector(
  atlantisSelector,
  (state: AtlantisState) => state.repositories,
);
