Utility functions for boilerplate free Redux with TypeScript

## Action creators

```typescript
const actions = createActions({
  addTodo: (text: string) => ({
    id: Math.random(),
    text,
  }),
  editTodo: payload<{ id: number; text: string }>(),
  removeTodo: payload<number>(),
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
    addTodo: (todos, { payload: newTodo }) => {
      return [...todos, newTodo]
    },
    editTodo: (todos, { payload: { id, text } }) => {
      return todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            text,
          }
        } else {
          return todo
        }
      })
    },
    removeTodo: (todos, { payload: id }) => {
      return todos.filter((todo) => todo.id !== id)
    },
  },
  [],
)
```
