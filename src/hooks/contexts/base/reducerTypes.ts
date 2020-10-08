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
 * リデューサーへ渡す値における、ペイロード部分の型定義。
 * @template T ペイロードの型。
 */
interface Payload<T> {
  /** ペイロード本体。 */
  readonly payload: T;
}
