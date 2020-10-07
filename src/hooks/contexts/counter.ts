import React from 'react';
import { createContainer } from 'unstated-next';
import type { Action, Register } from './type';

export const add = Symbol('add');
export const set = Symbol('set');

export type AddAction = Action<typeof add>;

export type SetAction = Action<typeof set, number>;

export interface State {
  readonly counter: number;
}

const initialState = Object.freeze<State>({ counter: 0 });

export const reducer: React.Reducer<State, AddAction | SetAction> = (
  state,
  action
) => {
  switch (action.type) {
    case add:
      return { ...state, counter: state.counter + 1 };
    case set:
      return { ...state, counter: action.payload };
    default:
      return state;
  }
};

export const CounterReducer = createContainer(() =>
  React.useReducer(reducer, initialState)
);

const useActions = () => {
  const [, dispatch] = CounterReducer.useContainer();
  return {
    add: React.useCallback(() => dispatch({ type: add }), [dispatch]),
    set: React.useCallback(
      (value: number) => dispatch({ type: set, payload: value }),
      [dispatch]
    ),
  } as const;
};

export const CounterActions = createContainer(useActions);

export default Object.freeze<Register>({
  actions: [CounterActions.Provider],
  reducer: CounterReducer.Provider,
});
