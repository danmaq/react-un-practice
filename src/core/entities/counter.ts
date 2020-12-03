/** カウンターのインクリメントを示す、識別定数。 */
export const increment = Symbol('increment');

/** カウンターの上書きを示す、識別定数。 */
export const set = Symbol('set');

/** カウンターの状態における、型定義。 */
export interface Counter {
  /** カウンター。 */
  readonly counter: number;
}
