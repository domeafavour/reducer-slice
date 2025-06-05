# Reducer Slice

[![npm version](https://img.shields.io/npm/v/@domeadev/reducer-slice.svg)](https://www.npmjs.com/package/@domeadev/reducer-slice)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

A lightweight utility for creating Redux-like reducer slices

## Installation

### npm

```bash
npm install @domeadev/reducer-slice
```

### yarn

```bash
yarn add @domeadev/reducer-slice
```

### pnpm

```bash
pnpm add @domeadev/reducer-slice
```

## Features

- Create type-safe reducer slices
- Automatically generate action creators
- Immutable state updates
- TypeScript support with full type inference

## Usage

### React + useReducer

```tsx
import { useReducer } from "react";
import { createReducerSlice } from "@domeadev/reducer-slice";

// Define your slice
const counterSlice = createReducerSlice({
  state: { count: 0 },
  reducers: {
    increment: (state) => ({ ...state, count: state.count + 1 }),
    decrement: (state) => ({ ...state, count: state.count - 1 }),
    addAmount: (state, payload: number) => ({
      ...state,
      count: state.count + payload,
    }),
  },
});

// Use it with React's useReducer hook
function CounterComponent() {
  const [state, dispatch] = useReducer(
    counterSlice.reducer,
    counterSlice.initialState
  );
  const { increment, decrement, addAmount } = counterSlice.actions;

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(addAmount(5))}>Add 5</button>
    </div>
  );
}
```

### Redux

```tsx
import { createStore } from "redux";
import { createReducerSlice } from "@domeadev/reducer-slice";
// Define your slice
const counterSlice = createReducerSlice({
  state: { count: 0 },
  reducers: {
    increment: (state) => ({ ...state, count: state.count + 1 }),
    decrement: (state) => ({ ...state, count: state.count - 1 }),
    addAmount: (state, payload: number) => ({
      ...state,
      count: state.count + payload,
    }),
  },
});
// Create Redux store
const store = createStore(counterSlice.reducer, counterSlice.initialState);
// Use the actions
store.dispatch(counterSlice.actions.increment());
store.dispatch(counterSlice.actions.decrement());
store.dispatch(counterSlice.actions.addAmount(5));
```

## API Reference

### `createReducerSlice`

```typescript
function createReducerSlice<State, Reducers>(slice: {
  state: State;
  reducers: Reducers;
}): {
  initialState: State;
  reducer: (state: State, action: Action) => State;
  actions: ActionCreators;
};
```

#### Parameters

- `slice`: An object containing:
  - `state`: The initial state
  - `reducers`: An object of reducer functions that take state and optional payload

#### Returns

- `initialState`: The initial state provided
- `reducer`: A reducer function to use with `useReducer`
- `actions`: Auto-generated action creators corresponding to your reducers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [domeafavour](https://github.com/domeafavour)
