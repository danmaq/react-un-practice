import { AnyFactor } from './factor';

/** 状態や要因の型を持たない、リデューサー関数の型定義におけるシノニム。 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyReducer = Reducer<any, AnyFactor>;

/**
 * ディスパッチ関数の型定義。
 * @template T リデューサー関数の型。
 */
export type Dispatch<T extends AnyReducer> = (factor: ReducerFactor<T>) => void;

/**
 * リデューサーにおける、ファクトリーの型定義。
 * @template T リデューサー関数の型。
 */
export type DispatchFactory<T extends AnyReducer> = (
  /** リデューサー関数。 */
  reducer: T,
  /** 初期状態。 */
  initialState: ReducerState<T>
) => readonly [ReducerState<T>, Dispatch<T>];

/**
 * リデューサー関数の型定義。
 * @template T 扱う状態の型。
 * @template F 扱う状態に対し、影響を与える要因の型。
 */
export type Reducer<T, F extends AnyFactor> = (
  /** 現在の状態。 */
  state: T,
  /** 現在の状態に対し、影響を与える要因。 */
  factor: F
) => T;

/**
 * リデューサー関数の型から、影響を与える要因の型を導出するための型定義。
 * @template T リデューサー関数の型。
 */
export type ReducerFactor<T extends AnyReducer> = T extends Reducer<
  unknown,
  infer F
>
  ? F
  : never;

/**
 * リデューサー関数の型から、状態の型を導出するための型定義。
 * @template T リデューサー関数の型。
 */
export type ReducerState<T extends AnyReducer> = T extends Reducer<
  infer S,
  AnyFactor
>
  ? S
  : never;
