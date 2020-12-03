// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFactor = Factor<any, any>;

/**
 * リデューサーへ渡す値の型定義。
 *
 * `P` の型を省略するか、`undefined` を指定した場合、ペイロードは
 * _optional_ となります。つまりペイロードの指定自体が省略可能となります。
 * @template T 識別子の型。
 *
 * 厳密等価演算子 (`===`) による、浅い比較で同一性を担保できる方の指定を推奨します。
 * @template P ペイロードの型。
 */
export type Factor<T, P = undefined> = TypeHolder<T> &
  (P extends undefined ? Partial<PayloadHolder<P>> : PayloadHolder<P>);

/**
 * 任意の型のペイロードを持つ、汎用オブジェクトの型定義。
 * @template T ペイロードの型。
 */
interface PayloadHolder<T = undefined> {
  /** ペイロード本体。 */
  readonly payload: T;
}

/**
 * 任意の型の識別子を持つ、汎用オブジェクトの型定義。
 * @template T 識別子の型。
 *
 * 厳密等価演算子 (`===`) による、浅い比較で同一性を担保できる方の指定を推奨します。
 */
interface TypeHolder<T> {
  /** 識別子。 */
  readonly type: T;
}

type Reducer<S, F extends AnyFactor> = (state: S, factor: F) => S;

type Hoge = { x: number };
type R = Reducer<Hoge, Factor<0, 0> | Factor<1, 1>>;
