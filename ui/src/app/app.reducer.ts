import {Action, createReducer} from "@ngrx/store";

export const initialState: AtlantisState = {
  repositories: [],
  locks: [],
}

const _atlantisReducer = createReducer(
  initialState,
)

export function atlantisReducer(state: AtlantisState | undefined, action: Action) {
  return _atlantisReducer(state, action);
}

