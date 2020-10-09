import createReducer, { Action } from '../base/createReducer';

/** フェッチ ログの追加を示す、識別定数。 */
export const add = Symbol('add');
/** フェッチ ログの全件削除を示す、識別定数。 */
export const clear = Symbol('clear');

/** フェッチ ログの単体構造。 */
export interface Item {
  /** 通信の所要時間を、ミリ秒単位で格納します。 */
  readonly time: number;
  /** 通信時における、カウンター値。 */
  readonly counter: number;
}

/** フェッチ ログ状態における、型定義。 */
export interface State {
  /** フェッチ ログ一覧。 */
  readonly items: readonly Item[];
}

/** フェッチ用のアクション パラメーター。 */
export type FetchAction = Action<typeof add, Item> | Action<typeof clear>;

/** フェッチ用のリデューサー コンテキスト。 */
export default createReducer<State, FetchAction>({
  initial: { items: [] },
  name: 'Fetch',
  reducer: (state, action) => {
    switch (action.type) {
      case add:
        return { ...state, items: [...state.items, action.payload] };
      case clear:
        return { ...state, items: [] };
      default:
        return state;
    }
  },
});
