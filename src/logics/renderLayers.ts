/**
 * レイヤー構造として要求する型定義。
 * @template R レイヤーの優先度として、使用する型。
 * @template T レイヤー本体の型。
 */
export type Layer<R extends PropertyKey, T> = Readonly<
  Partial<Record<R, T | readonly T[]>>
>;

/**
 * 指定した引数をルールに、レイヤー結合関数を生成します。
 * @template R レイヤーの優先度として、使用する型。
 *
 * キーとして列挙可能な型のみ使用可能です。
 * @param order ルールとするレイヤー定義と優先度を示した配列。
 *
 * インデックスが先頭の要素ほど、先頭に配置します。
 */
export default <R extends PropertyKey>(order: readonly R[]) =>
  /**
   * レイヤーを結合して、単一の配列を生成します。
   * @template T レイヤーの型。
   * @param layers レイヤー別に分類した、値もしくは値の一覧。
   */
  <T>(...layers: Layer<R, T>[]) =>
    order.reduce<T[]>((acc, key) => {
      const list = layers.flatMap((x): T | readonly T[] => x[key] ?? []);
      return [...acc, ...list];
    }, []);
