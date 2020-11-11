import type React from 'react';
import type { Action, ReducerSource } from '../../base/createReducer';

/** カウンターのインクリメントを示す、識別定数。 */
export const increment = Symbol('increment');

/** カウンターの上書きを示す、識別定数。 */
export const set = Symbol('set');

/** カウンターの状態における、型定義。 */
export interface CounterState {
  /** カウンター。 */
  readonly counter: number;
}

/** カウンター用のアクション パラメーター。 */
export type CounterAction =
  | Action<typeof increment>
  | Action<typeof set, number>;

/**
 * リデューサー関数。
 * @param state 直近の状態。
 * @param action ディスパッチ アクションのパラメーター。
 */
const reducer: React.Reducer<CounterState, CounterAction> = (state, action) => {
  switch (action.type) {
    case increment:
      return { ...state, counter: state.counter + 1 };
    case set:
      return { ...state, counter: action.payload };
    default:
      return state;
  }
};

export default Object.freeze<ReducerSource<typeof reducer>>({
  initial: { counter: 0 },
  reducer,
});
