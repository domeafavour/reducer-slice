import { describe, expect, it } from "vitest";
import { createReducerSlice } from "./createReducerSlice";

describe("createReducerSlice", () => {
  const initialState = { count: 0 };

  const slice = createReducerSlice({
    state: initialState,
    reducers: {
      increment: (state) => ({ ...state, count: state.count + 1 }),
      addAmount: (state, payload: number) => ({
        ...state,
        count: state.count + payload,
      }),
    },
  });

  it("should return initial state", () => {
    expect(slice.initialState).toEqual(initialState);
  });

  it("should create action creators", () => {
    expect(slice.actions.increment()).toEqual({
      type: "increment",
      payload: undefined,
    });
    expect(slice.actions.addAmount(5)).toEqual({
      type: "addAmount",
      payload: 5,
    });
  });

  it("should handle state updates with reducer", () => {
    const state = { count: 0 };

    const newState = slice.reducer(state, slice.actions.increment());
    expect(newState).toEqual({ count: 1 });

    const finalState = slice.reducer(newState, slice.actions.addAmount(5));
    expect(finalState).toEqual({ count: 6 });
  });

  it("should return current state for unknown action", () => {
    const state = { count: 0 };
    const unknownAction = { type: "unknown" };

    const newState = slice.reducer(state, unknownAction as any);
    expect(newState).toBe(state);
  });
});
