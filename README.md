Utility functions for boilerplate free Redux with TypeScript

## Action creators

```typescript
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
```
