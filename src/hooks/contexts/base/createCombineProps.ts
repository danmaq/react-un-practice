import type { Props, Provider } from './Combine';

/** コンテキストを登録する際における、オブジェクトの型定義。 */
export interface Register {
  /** アクション コンテキストのプロバイダーを指定します。 */
  readonly actions?: Provider;
  /** リデューサー コンテキストのプロバイダーを指定します。 */
  readonly reducer?: Provider;
}

/** `Register` の一覧から、特定条件のプロバイダー一覧を抽出するセレクター関数一覧。 */
const selectors = (() => {
  const createSelector = (
    selector: (register: Register) => Provider | undefined
  ) => (contexts: readonly Register[]) =>
    contexts.map(selector).filter((v): v is Provider => !!v);
  return {
    /** アクション コンテキスト一覧を抽出します。 */
    actions: createSelector(({ actions }) => actions),
    /** リデューサー コンテキスト一覧を抽出します。 */
    reducers: createSelector(({ reducer }) => reducer),
  } as const;
})();

/**
 * コンテキスト一覧から、結合に必要な属性一覧を作成します。
 * @param contexts コンテキスト一覧。
 */
export default (...contexts: readonly Register[]) =>
  Object.freeze<Props>({
    actions: selectors.actions(contexts),
    reducers: selectors.reducers(contexts),
  });
