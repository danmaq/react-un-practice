import type React from 'react';
import type { Action, Source } from '../../base/createReducer';

/** 文字列の上書きを示す、識別定数。 */
export const set = Symbol('set');

/** 文字列の状態における、型定義。 */
export interface TextState {
  /** 文字列。 */
  readonly text: string;
}

/** 文字列用のアクション パラメーター。 */
export type TextAction = Action<typeof set, string>;

/**
 * リデューサー関数。
 * @param state 直近の状態。
 * @param action ディスパッチ アクションのパラメーター。
 */
const reducer: React.Reducer<TextState, TextAction> = (state, action) => {
  switch (action.type) {
    case set:
      return { ...state, text: action.payload };
    default:
      return state;
  }
};

export default Object.freeze<Source<typeof reducer>>({
  initial: { text: '' },
  reducer,
});
