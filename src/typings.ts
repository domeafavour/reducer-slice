
export type ReducerPayload<R extends (...args: any[]) => any> = R extends (
  state: any
) => any
  ? never
  : R extends (state: any, payload: infer P) => any
  ? P
  : never;

export type AnySliceReducers<State> = Record<
  string,
  (state: State, payload?: any) => State
>;

export type ActionCreators<State, Reducers extends AnySliceReducers<State>> = {
  [type in keyof Reducers]: ReducerPayload<Reducers[type]> extends never
    ? () => { type: type }
    : (payload: ReducerPayload<Reducers[type]>) => {
        type: type;
        payload: ReducerPayload<Reducers[type]>;
      };
};

export type ActionWithPayload<Type, Payload extends any> = {
  type: Type;
  payload: Payload;
};

export type ReducerActions<State, Reducers extends AnySliceReducers<State>> = {
  [type in keyof Reducers]: ReducerPayload<Reducers[type]> extends never
    ? { type: type }
    : ActionWithPayload<type, ReducerPayload<Reducers[type]>>;
}[keyof Reducers];