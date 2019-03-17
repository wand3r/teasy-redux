import { createActions, is, payload, Action, createAction } from "./index"
import { ActionUnion } from "./action"

describe("action creation", () => {
  test("single action", () => {
    const action = createAction("add", payload<{ id: number }>())
    isType<Action<"add", { id: number }>>(action({ id: 1 }))
    expect(action({ id: 1 })).toEqual({ type: "add", payload: { id: 1 } })
    expect(action.type).toEqual("add")
  })
  describe("multiple actions", () => {
    const actions = createActions({
      add: payload<{ id: number }>(),
      edit: payload<number>(),
      remove: payload<void>(),
    })
    test("object payload", () => {
      isType<Action<"add", { id: number }>>(actions.add({ id: 2 }))
      expect(actions.add({ id: 2 })).toEqual({
        type: "add",
        payload: { id: 2 },
      })
    })
    test("primitive payload", () => {
      isType<Action<"edit", number>>(actions.edit(2))
      expect(actions.edit(2)).toEqual({ type: "edit", payload: 2 })
    })
    test("empty payload", () => {
      isType<Action<"remove", void>>(actions.remove())
      expect(actions.remove()).toEqual({
        type: "remove",
        payload: undefined,
      })
    })
  })
})

describe("is", () => {
  const actions = createActions({
    add: payload<{ id: number }>(),
    edit: payload<{ id: number; value: string }>(),
  })
  const anyAction: Action = actions.add({ id: 1 })
  test("with single action creator", () => {
    if (is(anyAction, actions.add)) {
      isType<"add">(anyAction.type)
    }
    expect(is(anyAction, actions.add)).toEqual(true)
  })
  test("with array of action creators", () => {
    if (is(anyAction, [actions.add, actions.edit])) {
      isType<"add" | "edit">(anyAction.type)
    }
    expect(is(anyAction, [actions.add, actions.edit])).toEqual(true)
  })
  test("with dictionary of action creators", () => {
    if (is(anyAction, actions)) {
      isType<"add" | "edit">(anyAction.type)
    }
    expect(is(anyAction, actions)).toEqual(true)
  })
})

describe("action union", () => {
  const actions = createActions({
    add: payload<{ id: number }>(),
    edit: payload<{ id: number; value: string }>(),
  })
  type ExpectedUnion =
    | { type: "add"; payload: { id: number } }
    | {
        type: "edit"
        payload: { id: number; value: string }
      }
  test("from object", () => {
    isType<ExpectedUnion>({} as ActionUnion<typeof actions>)
  })
  test("from array", () => {
    const actionsArr = [actions.add, actions.edit]
    isType<ExpectedUnion>({} as ActionUnion<typeof actionsArr>)
  })
  test("from single action", () => {
    isType<{ type: "add"; payload: { id: number } }>({} as ActionUnion<
      typeof actions.add
    >)
  })
})

const isType = <T>(_x: T) => {}
