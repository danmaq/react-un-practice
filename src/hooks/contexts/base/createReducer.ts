import isEqual from 'lodash/isEqual';
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
export type Action<T, P = undefined> = Readonly<
  ActionType<T> &
    (P extends undefined ? Partial<ActionPayload<P>> : ActionPayload<P>)
>;

/**
 * リデューサーへ渡す値における、ペイロード部分の型定義。
 * @template T ペイロードの型。
 */
interface ActionPayload<T> {
  /** ペイロード本体。 */
  readonly payload: T;
}

/**
 * リデューサーへ渡す値における、識別子部分の型定義。
 * @template T 識別子の型。
 */
interface ActionType<T> {
  /** 識別子。 */
  readonly type: T;
}

/**
 * リデューサー コンテキストを作成するためのオプション一覧。
 * @template S 状態の型。
 * @template A アクションの型。
 */
export interface CreateReducerOptions<S, A> {
  /**
   * 状態を更新するために深い比較を用いるかどうか。
   *
   * 省略時や `false` 指定時は、React 既定の浅い比較を用います。
   */
  readonly deepEquals?: boolean;
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
 * 状態の深い比較をし、相違があるなら新しい状態、そうでないなら古い状態を取得します。
 * @template T 状態の型。
 * @param prev 古い状態。
 * @param next 新しい状態。
 */
export const select = <T>(prev: T, next: T) =>
  isEqual(prev, next) ? prev : next;

/**
 * 状態の深い比較をするリデューサー関数を作成します。
 * @template S 状態の型。
 * @template A アクションの型。
 * @param reducer リデューサー関数。
 *
 * この関数の戻り値に対し、深い比較を行います。
 */
const deepReducer = <S, A>(reducer: React.Reducer<S, A>) =>
  Object.freeze<React.Reducer<S, A>>((state, action) =>
    select(state, reducer(state, action))
  );

/**
 * リデューサー コンテキストを作成します。
 * @template S 状態の型。
 * @template A アクションの型。
 * @param options オプション一覧。
 */
export default <S, A>(options: CreateReducerOptions<S, A>) => {
  const { deepEquals, initial, name, reducer } = options;
  const Container = createContainer(() =>
    React.useReducer(deepEquals ? deepReducer(reducer) : reducer, initial)
  );
  if (name) {
    Container.Provider.displayName = `[REDUCER] ${name}`;
  }
  return Container;
};
