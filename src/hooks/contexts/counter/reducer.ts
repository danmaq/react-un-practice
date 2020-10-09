import createReducer, { Action } from '../base/createReducer';

/** カウンターのインクリメントを示す、識別定数。 */
export const increment = Symbol('increment');

/** カウンターの上書きを示す、識別定数。 */
export const set = Symbol('set');

/** カウンターの状態における、型定義。 */
export interface State {
  /** カウンター。 */
  readonly counter: number;
}

/** カウンター用のアクション パラメーター。 */
export type CounterAction =
  | Action<typeof increment>
  | Action<typeof set, number>;

/** カウンター用のリデューサー コンテキスト。 */
export default createReducer<State, CounterAction>({
  initial: { counter: 0 },
  name: 'Counter',
  reducer: (state, action) => {
    switch (action.type) {
      case increment:
        return { ...state, counter: state.counter + 1 };
      case set:
        return { ...state, counter: action.payload };
      default:
        return state;
    }
  },
});
