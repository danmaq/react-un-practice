import React from 'react';
import { createContainer } from 'unstated-next';
import type { Action } from '../base/reducerTypes';

export const add = Symbol('add');
export const set = Symbol('set');

export type AddAction = Action<typeof add>;

export type SetAction = Action<typeof set, number>;

export interface State {
  readonly counter: number;
}

const initialState = Object.freeze<State>({ counter: 0 });

const reducer: React.Reducer<State, AddAction | SetAction> = (
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

const Container = createContainer(() =>
  React.useReducer(reducer, initialState)
);
Container.Provider.displayName = '[REDUCER] Counter';

export default Container;
