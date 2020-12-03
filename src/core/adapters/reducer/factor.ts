/** 識別子やペイロードの型を持たない、要因の型定義におけるシノニム。 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFactor = Factor<any, any>;

/**
 * リデューサーの状態を変更する、要因における型定義。
 * @template T 識別子の型。
 *
 * 厳密等価演算子 (`===`) による、浅い比較での同一性を担保が容易な、
 * プリミティブ型の指定を推奨します。
 * @template P ペイロードの型。
 *
 * 省略するか、`undefined` を指定した場合、ペイロードは _optional_ です。
 * つまりペイロードの指定自体が省略可能となります。
 */
export type Factor<T, P = undefined> = TypeHolder<T> & OptionalPayloadHolder<P>;

/**
 * 任意の型のペイロードを持つ、汎用オブジェクトの型定義。
 * @template T ペイロードの型。
 *
 * 省略するか、`undefined` を指定した場合、ペイロードは _optional_ です。
 * つまりペイロードの指定自体が省略可能となります。
 */
type OptionalPayloadHolder<T = undefined> = T extends undefined
  ? Partial<PayloadHolder<T>>
  : PayloadHolder<T>;

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
 * 厳密等価演算子 (`===`) による、浅い比較での同一性を担保が容易な、
 * プリミティブ型の指定を推奨します。
 */
interface TypeHolder<T> {
  /** 識別子。 */
  readonly type: T;
}
