import {Action, createReducer, on} from "@ngrx/store";
import {setRepositories} from "./app.actions";

export const initialState: AtlantisState = {
  repositories: [],
  locks: [],
}

const _atlantisReducer = createReducer(
  initialState,
  on(setRepositories, (state, action) => ({
    ...state,
    repositories: action.repositories,
  }))
)

export function atlantisReducer(state: AtlantisState | undefined, action: Action) {
  return _atlantisReducer(state, action);
}

