import React from 'react';
import CombinedContexts from './base/Combine';
import order from './base/order';
import counterContext from './counter';
import fetchContext from './fetch';

/**
 * コンテキスト一覧。
 *
 * 別のコンテキストを追加する場合、ここに挿入します。
 *
 * 同一ヒエラルキーのコンテキストを参照したい場合、
 * 参照対象より末尾に指定します。
 */
const providers = order(counterContext, fetchContext);

/** コンテキスト一覧をレンダリング ツリーに結合するための HOC。 */
const Component: React.FC = ({ children }) => (
  <CombinedContexts providers={providers}>{children}</CombinedContexts>
);
Component.displayName = 'Contexts';

export default Component;
