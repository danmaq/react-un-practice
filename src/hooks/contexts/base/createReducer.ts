import React from 'react';
import { createContainer } from 'unstated-next';

/**
 * リデューサーへ渡す値の型定義。
 *
 * `P` の型を省略するか、`undefined` を指定した場合、ペイロードは
 * _optional_ となります。つまりペイロードの指定自体が省略可能となります。
 * @template T 識別子の型。
 * @template P ペイロードの型。
 */
export type Action<T extends PropertyKey, P = undefined> = Readonly<
  ActionType<T> & (P extends undefined ? Partial<Payload<P>> : Payload<P>)
>;

/**
 * リデューサーへ渡す値における、識別子部分の型定義。
 * @template T 識別子の型。
 */
interface ActionType<T extends PropertyKey> {
  /** 識別子。 */
  readonly type: T;
}

/**
 * リデューサー コンテキストを作成するためのオプション一覧。
 * @template S 状態の型。
 * @template A アクションの型。
 */
export interface CreateReducerOptions<S, A> {
  /** 初期状態。 */
  readonly initial: Readonly<S>;
  /**
   * コンテキストをラッピングする、コンポーネント名。
   *
   * 省略しても問題ありませんが、デバッグ時に有用です。
   */
  readonly name?: string;
  /** リデューサー関数。 */
  readonly reducer: React.Reducer<S, A>;
}

/**
 * リデューサーへ渡す値における、ペイロード部分の型定義。
 * @template T ペイロードの型。
 */
interface Payload<T> {
  /** ペイロード本体。 */
  readonly payload: T;
}

/**
 * リデューサー コンテキストを作成します。
 * @template S 状態の型。
 * @template A アクションの型。
 * @param options オプション一覧。
 */
export default <S, A>(options: CreateReducerOptions<S, A>) => {
  const { initial, name, reducer } = options;
  const Container = createContainer(() => React.useReducer(reducer, initial));
  if (name) {
    Container.Provider.displayName = `[REDUCER] ${name}`;
  }
  return Container;
};
