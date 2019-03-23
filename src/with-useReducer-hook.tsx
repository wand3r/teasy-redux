import { createActions, createReducer, payload } from "."
import React, { useReducer, FC } from "react"

const actions = createActions({
  increment: payload<{ by: number }>(),
  decrement: payload<{ by: number }>(),
})

const initialState = { count: 0 }

const reducer = createReducer<{ count: number }, typeof actions>(
  {
    increment: (state, { payload: { by } }) => {
      return { count: state.count + by }
    },
    decrement: (state, { payload: { by } }) => {
      return { count: state.count - by }
    },
  },
  initialState,
)

export const Counter: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div>
      <button onClick={() => dispatch(actions.decrement({ by: 2 }))}>-</button>>
      <span>{state.count}</span>
      <button onClick={() => dispatch(actions.increment({ by: 2 }))}>+</button>
    </div>
  )
}
