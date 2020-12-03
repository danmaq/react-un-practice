export type Counter = number;

/** カウンター値をインクリメントします。 */
export const increment = (value: Counter) => value + 1;

/** カウンター値を設定します。 */
export const set = (value: Counter) => value;
