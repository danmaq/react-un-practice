import isEqual from 'lodash/isEqual';
import React from 'react';
import { createContainer, Container } from 'unstated-next';

/** 抽象化したリデューサー関数における、型定義のシノニム。 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AbstractReducer = React.Reducer<any, any>;

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
 * リデューサー コンテキストを作成するための、任意のオプション一覧。
 * @template R リデューサー関数の型。
 */
export interface Options {
  /**
   * 状態を更新するために深い比較を用いるかどうか。
   *
   * 省略時や `false` 指定時は、React 既定の浅い比較を用います。
   */
  readonly deepEquals?: boolean;
  /**
   * コンテキストをラッピングする、コンポーネント名。
   *
   * 省略しても問題ありませんが、デバッグ時に有用です。
   */
  readonly name?: string;
}

/**
 * リデューサー関数と初期状態とのペア。
 * @template R リデューサー関数の型。
 */
export interface Source<R extends AbstractReducer> {
  /** 初期状態。 */
  readonly initial: React.ReducerState<R>;
  /** リデューサー関数。 */
  readonly reducer: R;
}

/**
 * 状態のプロパティーにアクセスします。
 * @template S 状態の型。
 * @param container コンテナー。
 * @param key 状態のプロパティ名。
 */
export const useReducerState = <S, K extends keyof S>(
  container: Container<[S, unknown], void>,
  key: K
) => {
  const [state] = container.useContainer();
  return state[key];
};

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
export default <S, A>(options: Options & Source<React.Reducer<S, A>>) => {
  const { deepEquals, initial, name, reducer } = options;
  const container = createContainer(() =>
    React.useReducer(deepEquals ? deepReducer(reducer) : reducer, initial)
  );
  if (name) {
    container.Provider.displayName = `[REDUCER] ${name}`;
  }
  return container;
};
