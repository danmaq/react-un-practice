import React from 'react';
import { createContainer } from 'unstated-next';
import type { Action } from '../base/reducerTypes';

/** カウンターの追加を示す定数。 */
export const add = Symbol('add');

/** カウンターの設定を示す定数。 */
export const set = Symbol('set');

/** カウンターの状態における、型定義。 */
export interface State {
  /** カウンター。 */
  readonly counter: number;
}

/** 初期状態。 */
const initialState = Object.freeze<State>({ counter: 0 });

/** カウンター状態更新のためのリデューサー。 */
const reducer: React.Reducer<
  State,
  Action<typeof add> | Action<typeof set, number>
> = (state, action) => {
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
