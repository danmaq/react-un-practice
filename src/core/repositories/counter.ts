import { Reducer } from '../adapters/reducer/reducer';
import { Factor } from '../adapters/reducer/factor';
import { Counter, increment, set } from '../entities/counter';

/** カウンターのインクリメントを示す、識別定数。 */
export const doIncrement = Symbol('doIncrement');

/** カウンターの上書きを示す、識別定数。 */
export const doSet = Symbol('doSet');

/** カウンターの初期状態。 */
export const initial: Counter = 0;

/** カウンター用のアクション パラメーター。 */
export type CounterFactor =
  | Factor<typeof doIncrement>
  | Factor<typeof doSet, Counter>;

/**
 * リデューサー関数。
 * @param state 直近の状態。
 * @param action ディスパッチ アクションのパラメーター。
 */
export const reducer: Reducer<Counter, CounterFactor> = (state, factor): Counter => {
  switch (factor.type) {
    case doIncrement:
      return increment(state);
    case doSet:
      return set(factor.payload);
    default:
      return state;
  }
};
