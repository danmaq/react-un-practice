import React from 'react';
import { createContainer } from 'unstated-next';
import type { Action } from '../base/reducerTypes';

export const add = Symbol('add');
export const clear = Symbol('clear');

export interface Item {
  readonly time: number;
  readonly counter: number;
}

export interface State {
  readonly items: readonly Item[];
}

const initialState = Object.freeze<State>({ items: [] });

const reducer: React.Reducer<
  State,
  Action<typeof add, Item> | Action<typeof clear>
> = (state, action) => {
  switch (action.type) {
    case add:
      return { ...state, items: [...state.items, action.payload] };
    case clear:
      return { ...state, items: [] };
    default:
      return state;
  }
};

const Container = createContainer(() =>
  React.useReducer(reducer, initialState)
);
Container.Provider.displayName = '[REDUCER] Fetch';

export default Container;
