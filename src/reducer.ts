import { Action, ActionUnion, ActionPack } from "."
import { DeepReadonly } from "./type-utils"

type ReducerMap<TActionUnion extends Action, State> = {
  [ActionType in TActionUnion["type"]]: (
    state: State,
    action: Extract<TActionUnion, { type: ActionType }>,
  ) => State
} & { default?: (state: State) => State }

export const createReducer = <TState, TActions extends ActionPack>(
  cases: ReducerMap<ActionUnion<TActions>, DeepReadonly<TState>>,
  initialState: DeepReadonly<TState>,
) => (
  currentState: DeepReadonly<TState>,
  action: Action,
): DeepReadonly<TState> => {
  const type = action.type
  const state = currentState !== undefined ? currentState : initialState
  if (type in cases) {
    return (cases as any)[type](state, action)
  } else if (cases.default) {
    return cases.default(state as any)
  } else {
    return state as any
  }
}
