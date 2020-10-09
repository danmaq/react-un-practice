import React from 'react';
import Combine from './base/Combine';
import createCombineProps from './base/createCombineProps';
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
const props = createCombineProps(counterContext, fetchContext);

/** コンテキスト一覧をレンダリング ツリーに結合するための HOC。 */
const Component: React.FC = ({ children }) => {
  const { actions, reducers } = props;
  return (
    <Combine actions={actions} reducers={reducers}>
      {children}
    </Combine>
  );
};
Component.displayName = 'Contexts';

export default Component;
