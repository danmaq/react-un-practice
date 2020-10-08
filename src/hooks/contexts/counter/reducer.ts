import createReducer, { Action } from '../base/createReducer';

/** カウンターの追加を示す定数。 */
export const add = Symbol('add');

/** カウンターの設定を示す定数。 */
export const set = Symbol('set');

/** カウンターの状態における、型定義。 */
export interface State {
  /** カウンター。 */
  readonly counter: number;
}

export default createReducer<
  State,
  Action<typeof add> | Action<typeof set, number>
>({
  initialState: { counter: 0 },
  reducer: (state, action) => {
    switch (action.type) {
      case add:
        return { ...state, counter: state.counter + 1 };
      case set:
        return { ...state, counter: action.payload };
      default:
        return state;
    }
  },
  name: 'Counter',
});
