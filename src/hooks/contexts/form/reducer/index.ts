import { useReducerState } from '../../base/createReducer';
import combineReducer, { CombinedState } from '../../base/combineReducer';
import counter, { CounterAction } from './counter';
import text, { TextAction } from './text';

/** フォーム用に結合するリデューサー一覧。 */
const list = { counter, text } as const;

export type State = CombinedState<typeof list>;

/** フォーム用の結合済みリデューサー アクションにおける型定義。 */
export type DispatchAction = CounterAction | TextAction;

/** フォーム用の結合済みリデューサー コンテキスト。 */
const reducer = combineReducer<DispatchAction>({
  deepEquals: true,
  name: 'Form',
})(list);

/** カウンターにアクセスするためのカスタムフック。 */
export const useCounter = () => useReducerState(reducer, 'counter');

/** テキストにアクセスするためのカスタムフック。 */
export const useText = () => useReducerState(reducer, 'text');

export default reducer;
