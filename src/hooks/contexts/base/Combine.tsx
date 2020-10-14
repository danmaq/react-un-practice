import React from 'react';
import type { ContainerProviderProps } from 'unstated-next';

/** コンポーネントの要求する型定義。 */
export interface Props {
  /** コンテキスト プロバイダー一覧。 */
  readonly providers?: readonly Provider[];
}

/** コンテキストのプロバイダー型の短縮表記。 */
export type Provider = React.ComponentType<ContainerProviderProps>;

/** プロバイダー一覧を単純結合する HOC コンポーネント。 */
const Component: React.FC<Props> = ({ children, providers = [] }) =>
  // Decorator パターンのように、後の要素をラッピングしていく構造のため、`reduceRight` で反転している。
  providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    <>{children}</>
  );
Component.displayName = 'Combine';

export default Component;
