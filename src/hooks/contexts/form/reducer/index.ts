import createReducer from '../../base/createReducer';
import counter, { CounterAction } from './counter';
import text, { TextAction } from './text';

/** フォーム用に結合するリデューサー一覧。 */
const list = { counter, text } as const;

/** フォーム用に結合するリデューサーのキー一覧。 */
const keys = Object.keys(list) as readonly (keyof typeof list)[];

/** フォーム用の結合済み状態における型定義。 */
export type State = {
  readonly [k in keyof typeof list]: typeof list[k]['initial'];
};

/** フォーム用の結合済みリデューサー アクションにおける型定義。 */
export type DispatchAction = CounterAction | TextAction;

/** フォーム用の結合済みリデューサー コンテキスト。 */
export default createReducer<State, DispatchAction>({
  initial: keys.reduce<State>(
    (acc, key) => ({ ...acc, [key]: list[key].initial }),
    {} as State
  ),
  reducer: (state, action) =>
    keys.reduce(
      (acc, key) => ({
        ...acc,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key]: list[key].reducer(acc[key] as any, action as any),
      }),
      state
    ),
});
