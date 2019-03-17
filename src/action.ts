export type Action<ActionType = string, Payload = any> = {
  type: ActionType
} & Payload

export type ActionCreator<
  ActionType = string,
  Args extends any[] = any[],
  Payload = any
> = {
  (...args: Args): Action<ActionType, Payload>
  type: ActionType
}

export const payload = <Payload, Args extends any[] = [Payload]>(
  map: (...args: Args) => Payload = (...args) => args[0],
) => (...args: Args) => ({ payload: map(...args) })

export const createAction = <
  ActionType extends string,
  Args extends any[],
  Payload
>(
  type: ActionType,
  mapPayload: (...args: Args) => Payload,
): ActionCreator<ActionType, Args, Payload> => {
  const actionCreator = (...args: Args) => ({
    ...mapPayload(...args),
    type,
  })
  actionCreator.type = type
  return actionCreator
}

export type ActionsSchema = { [actionType: string]: (...args: any[]) => any }

export type ActionCreators<Schema extends ActionsSchema = any> = {
  [ActionType in keyof Schema]: ActionCreator<
    ActionType,
    Parameters<Schema[ActionType]>,
    ReturnType<Schema[ActionType]>
  >
}

export const createActions = <Schema extends ActionsSchema>(
  schema: Schema,
): ActionCreators<Schema> => {
  const actionCreators = {} as ActionCreators<Schema>
  for (const actionType in schema) {
    actionCreators[actionType] = createAction(actionType, schema[actionType])
  }
  return actionCreators
}

export const is = <ActionsToMatch extends ActionPack>(
  action: Action,
  actionsToMatch: ActionsToMatch,
): action is ActionUnion<ActionsToMatch> => {
  if (typeof actionsToMatch === "function" && "type" in actionsToMatch) {
    return action.type === (actionsToMatch as ActionCreator).type
  } else if (Array.isArray(actionsToMatch)) {
    return actionsToMatch.some(
      (actionCreator: ActionCreator) => actionCreator.type === action.type,
    )
  } else if (typeof actionsToMatch === "object") {
    return Object.values(actionsToMatch).some(
      (actionCreator) => actionCreator.type === action.type,
    )
  }

  throw Error("Wrong matchTo type")
}

export type ActionPack = ActionCreator | ActionCreators | ActionCreator[]

export type ActionUnion<
  Actions extends ActionPack
> = Actions extends ActionCreator
  ? ReturnType<Actions>
  : Actions extends ActionCreators
  ? { [P in keyof Actions]: ReturnType<Actions[P]> }[keyof Actions]
  : Actions extends ActionCreator[]
  ? ReturnType<Actions[number]>
  : never
