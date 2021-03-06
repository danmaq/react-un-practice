import React from 'react';
import CombinedContexts from './base/Combine';
import order from './base/order';
import fetchContext from './fetch';
import fooContext from './foo';
import formContext from './form';

/**
 * コンテキスト一覧。
 *
 * 別のコンテキストを追加する場合、ここに挿入します。
 *
 * 同一ヒエラルキーのコンテキストを参照したい場合、
 * 参照対象より末尾に指定します。
 */
const providers = order(fetchContext, fooContext, formContext);

/** コンテキスト一覧をレンダリング ツリーに結合するための HOC。 */
const Component: React.FC = ({ children }) => (
  <CombinedContexts providers={providers}>{children}</CombinedContexts>
);
Component.displayName = 'Contexts';

export default Component;
