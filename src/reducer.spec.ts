import { createActions, createReducer, payload } from "./index"
import { Action } from "./action"

describe("create reducer", () => {
  type State = number[]
  const state: State = []
  const actions = createActions({
    add: payload<{ id: number }>(),
  })
  describe("has correct types", () => {
    test("with dictionary action creators", () => {
      createReducer<State, typeof actions>(
        {
          add: (state, action) => {
            isType<Action<"add", { payload: { id: number } }>>(action)
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
            isType<Action<"add", { payload: { id: number } }>>(action)
            return state
          },
        },
        {} as State,
      )
    })
    test("with actions union", () => {
      createReducer<State, typeof actions>(
        {
          add: (state, action) => {
            isType<Action<"add", { payload: { id: number } }>>(action)
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
            isType<Action<"add", { payload: { id: number } }>>(action)
            return state
          },
        },
        {} as State,
      )
    })
  })
  describe("handles", () => {
    test("matching action", () => {
      const reducer = createReducer<State, typeof actions>(
        {
          add: (state, { payload: { id } }) => {
            return [...state, id]
          },
        },
        [],
      )
      expect(reducer(state, actions.add({ id: 10 }))).toEqual([10])
    })
    test("unmatching action with implicit default handler", () => {
      const reducer = createReducer<State, typeof actions>(
        {
          add: (state, { payload: { id } }) => {
            return [...state, id]
          },
        },
        [],
      )
      expect(reducer(state, { type: "foo", payload: undefined })).toEqual(state)
    })
    test("unmatching action with explicit default handler", () => {
      const reducer = createReducer<State, typeof actions>(
        {
          add: (state, { payload: { id } }) => {
            return [...state, id]
          },
          default: (state) => {
            return [...state, 1]
          },
        },
        [] as State,
      )
      expect(reducer(state, { type: "foo", payload: undefined })).toEqual([1])
    })
  })
})

const isType = <T>(_x: T) => {}
