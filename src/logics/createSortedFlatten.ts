/**
 * 指定した引数をルールに、ラスタライズ関数を生成します。
 * @template R レイヤーの優先度として、使用する型。
 *
 * キーとして列挙可能な型のみ使用可能です。
 * @param order ルールとするレイヤー定義と優先度を示した配列。
 *
 * インデックスが先頭の要素ほど、先頭に配置します。
 */
export default <R extends PropertyKey>(order: readonly R[]) => <T>(
  /** レイヤー別に分類した、値もしくは値の一覧。 */
  ...layers: Record<R, T | readonly T[]>[]
) =>
  order.reduce<T[]>((acc, key) => {
    const list = layers.flatMap((x): T | readonly T[] => x[key]);
    return [...acc, ...list];
  }, []);
