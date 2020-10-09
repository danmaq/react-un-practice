import React from 'react';
import type { ContainerProviderProps } from 'unstated-next';

/** 基本形 HOC における、要求する型定義。 */
interface InternalProps {
  /** コンテキスト プロバイダー一覧。 */
  readonly providers?: readonly Provider[];
}

/** コンポーネントの要求する型定義。 */
export interface Props {
  /**
   * アクション コンテキストのプロバイダー一覧。
   *
   * リデューサー コンテキストの子要素としてレンダリング ツリーに繋ぐため、
   * 全てのリデューサー コンテキストを参照することができます。
   */
  readonly actions?: readonly Provider[];
  /**
   * リデューサー コンテキストのプロバイダー一覧。
   *
   * 入れ子の上位としてレンダリング ツリーに繋ぐため、
   * 全てのアクション コンテキストから参照することができます。
   */
  readonly reducers?: readonly Provider[];
}

/** コンテキストのプロバイダー型の短縮表記。 */
export type Provider = React.ComponentType<ContainerProviderProps>;

/** プロバイダー一覧を結合して取り込むための、基本形となる HOC。 */
const Internal: React.FC<InternalProps> = ({ children, providers = [] }) =>
  providers.reduce(
    (acc, Provider) => <Provider>{acc}</Provider>,
    <>{children}</>
  );
Internal.displayName = 'InternalCombinedContexts';

/**
 * プロバイダー一覧を結合して取り込むコンポーネント。
 *
 * レンダリング ツリーの構造がリデューサー➡︎アクションとなるよう、
 * 入れ子状にしています。
 */
const Component: React.FC<Props> = ({ actions, children, reducers }) => (
  <Internal providers={reducers}>
    <Internal providers={actions}>{children}</Internal>
  </Internal>
);
Component.displayName = 'CombinedContexts';

export default Component;
