import renderLayers, { Layer } from '../../../logics/renderLayers';

/** リデューサー コンテキストのレイヤーを示す定数。 */
export const REDUCER = Symbol('reducer');

/** アクション コンテキストのレイヤーを示す定数。 */
export const ACTIONS = Symbol('actions');

/**
 * 結合のための上位アクション コンテキストのレイヤーを示す定数。
 *
 * _注意: この定数を使用する前に、極力 `ACTIONS` の使用を検討してください。_
 */
export const INTEGRATED = Symbol('integrated');

/**
 * レイヤー結合のための優先度ルール。
 *
 * インデックスが若いものほど、より上位のレイヤーとなります。
 *
 * 新しいレイヤー階層が必要である場合、ここに追加していきます。
 */
const orderRule = [REDUCER, ACTIONS, INTEGRATED] as const;

/**
 * レイヤー構造として要求する型定義。
 * @template T レイヤー本体の型。
 */
export type ConcretedLayer<T> = Layer<typeof orderRule[number], T>;

export default renderLayers(orderRule);
