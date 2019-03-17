# TeaSy Redux

Utility functions for boilerplate free Redux with TypeScript

## Action Creators

```typescript
const addTodo = createAction(
  "ADD_TODO",
  payload((text: string) => ({
    id: Math.random(),
    text,
  })),
)

addTodo("text")

const actions = createActions({
  addTodo: payload((text: string) => ({
    id: Math.random(),
    text,
  })),
  editTodo: payload<{ id: number; text: string }>(),
  removeTodo: (id: number) => ({ payload: { id } }),
})

actions.addTodo("New text")
actions.editTodo({ id: 123, text: "Edited text" })
actions.removeTodo(123)
```

## Reducers

```typescript
type State = { id: number; text: string }[]

const reducer = createReducer<State, typeof actions>(
  {
    addTodo: (todos, { payload: { id, text } }) => {
      return todos
    },
    editTodo: (todos, { payload: { id, text } }) => {
      return todos
    },
    removeTodo: (todos, { payload: { id } }) => {
      return todos
    },
  },
  [],
)

const reducer = (todos: State, action: ActionUnion<typeof actions>): State => {
  switch (action.type) {
    case actions.addTodo.type: {
      const { id, text } = action.payload
      return todos
    }
    case actions.editTodo.type: {
      const { id, text } = action.payload
      return todos
    }
    case actions.removeTodo.type: {
      const { id } = action.payload
      return todos
    }
    default: {
      return todos
    }
  }
}
```

## Type Guards

```typescript
if (is(anyAction, actions.addTodo)) {
  // ...
}
if (is(anyAction, [actions.addTodo, actions.editTodo])) {
  // ...
}
if (is(anyAction, actions)) {
  // ...
}
```

## Action Union

```typescript
const actionsArr = [actions.addTodo, actions.removeTodo]

type Union1 = ActionUnion<typeof actions>
type Union2 = ActionUnion<typeof actionsArr>
```
