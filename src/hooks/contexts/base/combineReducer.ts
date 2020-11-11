import type React from 'react';
import createReducer, {
  AbstractReducer,
  Options,
  Source as ItemSource,
} from './createReducer';

/** 抽象化したリデューサーと初期状態とのペア一覧における、型定義のシノニム。 */
type AbstractSource = Record<string, ItemSource<AbstractReducer>>;

/**
 * 結合した状態の型定義。
 * @template T リデューサーと初期状態とのペアの型。
 */
export type CombinedState<T extends Source<AbstractSource>> = {
  readonly [k in keyof T]: T[k]['initial'];
};

/**
 * ソースとなる、リデューサーと初期状態とのペアの型。
 * @template T 値の型。
 */
export type Source<T extends AbstractSource> = T;

/**
 * 結合した、`createReducer` 関数のソースを作成します。
 * @template A 結合したリデューサー アクションの型。
 * @template S ソースとなる、リデューサーと初期状態とのペア一覧の型。
 * @param source ソースとなる、リデューサーと初期状態とのペア一覧。
 */
const createCombinedSource = <A, S extends AbstractSource>(
  source: Source<S>
) => {
  type State = CombinedState<typeof source>;
  const keys = Object.keys(source) as readonly (keyof typeof source)[];
  return Object.freeze<ItemSource<React.Reducer<CombinedState<S>, A>>>({
    initial: keys.reduce<State>(
      (acc, key) => ({ ...acc, [key]: source[key].initial }),
      {} as State
    ),
    reducer: (state, action) =>
      keys.reduce(
        (acc, key) => ({
          ...acc,
          [key]: source[key].reducer(acc[key], action),
        }),
        state
      ),
  });
};

/**
 * 結合済みリデューサー コンテキストを作成する関数を生成します。
 * @template T 結合したリデューサー アクションの型。
 * @param options オプション一覧。
 */
export default <T>(options?: Options) =>
  /**
   * 結合済みリデューサー コンテキストを作成します。
   * @template S ソースとなる、リデューサーと初期状態とのペア一覧の型。
   * @param source ソースとなる、リデューサーと初期状態とのペア一覧。
   */
  <S extends AbstractSource>(source: Source<S>) =>
    createReducer<CombinedState<typeof source>, T>({
      ...options,
      ...createCombinedSource(source),
    });
