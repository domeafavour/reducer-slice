import type {
  ActionCreators,
  ActionWithPayload,
  ReducerActions,
} from "./typings";

export function createReducerSlice<
  State,
  Reducers extends Record<string, (state: State, payload?: any) => State>
>(slice: { state: State; reducers: Reducers }) {
  function reducer(state: State, action: ReducerActions<State, Reducers>) {
    return (
      slice.reducers[action.type]?.(
        state,
        (action as ActionWithPayload<string, any>).payload
      ) ?? state
    );
  }

  const actionCreators = Object.fromEntries(
    Object.keys(slice.reducers).map((type) => [
      type,
      (payload: unknown) => ({ type, payload }),
    ])
  ) as ActionCreators<State, Reducers>;

  return { initialState: slice.state, reducer, actions: actionCreators };
}
