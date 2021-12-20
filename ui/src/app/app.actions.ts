import {createAction, props} from "@ngrx/store";

export const setRepositories = createAction('[Repositories] SetRepositories', props<{
  repositories: Repository[],
}>())
export const loadRepositories = createAction('[Repositories] LoadRepositories')
