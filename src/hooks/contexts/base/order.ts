import renderLayers, { Layer } from '../../../logics/renderLayers';

/** リデューサー コンテキストのレイヤーを示す定数。 */
export const REDUCER = Symbol('reducer');

/** アクション コンテキストのレイヤーを示す定数。 */
export const ACTIONS = Symbol('actions');

/** 結合のための上位アクション コンテキストのレイヤーを示す定数。 */
export const INTEGRATED = Symbol('integrated');

/**
 * レイヤー結合のための優先度ルール。
 *
 * インデックスが若いものほど、より上位のレイヤーとなります。
 */
const orderRule = [REDUCER, ACTIONS, INTEGRATED] as const;

/**
 * レイヤー構造として要求する型定義。
 * @template T レイヤー本体の型。
 */
export type ConcretedLayer<T> = Layer<typeof orderRule[number], T>;

export default renderLayers(orderRule);
