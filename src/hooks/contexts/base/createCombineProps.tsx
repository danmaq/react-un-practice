import type { Props, Provider } from './combine';

/** コンテキストを登録する際における、オブジェクトの型定義。 */
export interface Register {
  /** アクション コンテキストのプロバイダーを指定します。 */
  readonly actions?: Provider;
  /** リデューサー コンテキストのプロバイダーを指定します。 */
  readonly reducer?: Provider;
}

/**
 * `Register` の一覧から、特定条件のプロバイダー一覧を抽出するメソッドを作成します。
 * @param selector セレクター。
 */
const createProvidersGetter = (
  selector: (register: Register) => Provider | undefined
) => (contexts: readonly Register[]) =>
  contexts.map(selector).filter((v): v is Provider => !!v);

/** `Register` の一覧から、アクション コンテキストのプロバイダーを抽出します。 */
const getActions = createProvidersGetter(({ actions }) => actions);

/** `Register` の一覧から、リデューサー コンテキストのプロバイダーを抽出します。 */
const getReducers = createProvidersGetter(({ reducer }) => reducer);

/**
 * コンテキスト一覧から、結合に必要な属性一覧を作成します。
 * @param contexts コンテキスト一覧。
 */
export default (contexts: readonly Register[]) =>
  Object.freeze<Props>({
    actions: getActions(contexts),
    reducers: getReducers(contexts),
  });
