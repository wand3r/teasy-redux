import { createActions, createReducer, payload } from "./index"
import { Action, ActionUnion } from "./action"

describe("create reducer", () => {
  type State = { id: number; counter: number }
  const state: State = { id: 10, counter: 0 }
  const actions = createActions({
    add: payload<{ id: number }>(),
  })
  describe("has correct types", () => {
    test("with dictionary action creators", () => {
      createReducer<State, typeof actions>(
        {
          add: (state, action) => {
            isType<Action<"add", { id: number }>>(action)
            return state
          },
        },
        {} as State,
      )
    })
    test("with array action creators", () => {
      const actionsArr = [actions.add]
      createReducer<State, typeof actionsArr>(
        {
          add: (state, action) => {
            isType<Action<"add", { id: number }>>(action)
            return state
          },
        },
        {} as State,
      )
    })
    test("with actions union", () => {
      createReducer<State, ActionUnion<typeof actions>>(
        {
          add: (state, action) => {
            isType<Action<"add", { id: number }>>(action)
            return state
          },
        },
        {} as State,
      )
    })
    test("with single action creator", () => {
      createReducer<State, typeof actions["add"]>(
        {
          add: (state, action) => {
            isType<Action<"add", { id: number }>>(action)
            return state
          },
        },
        {} as State,
      )
    })
  })
  describe("process", () => {
    test("matching action", () => {
      const reducer = createReducer<State, typeof actions>(
        {
          add: (state, _action) => {
            return { ...state, counter: state.counter + 1 }
          },
        },
        {} as State,
      )
      expect(reducer(state, actions.add({ id: 10 }))).toEqual({
        id: 10,
        counter: 1,
      })
    })
    test("unmatching action with implicit default handler", () => {
      const reducer = createReducer<State, typeof actions>(
        {
          add: (state, _action) => {
            return { ...state, counter: state.counter + 1 }
          },
        },
        {} as State,
      )
      expect(reducer(state, { type: "foo", payload: undefined })).toEqual(state)
    })
    test("unmatching action with explicit default handler", () => {
      const reducer = createReducer<State, typeof actions>(
        {
          add: (state, _action) => {
            return { ...state, counter: state.counter + 1 }
          },
          default: (state) => {
            return { ...state, counter: -1 }
          },
        },
        {} as State,
      )
      expect(reducer(state, { type: "foo", payload: undefined })).toEqual({
        id: 10,
        counter: -1,
      })
    })
  })
})

const isType = <T>(_x: T) => {}
