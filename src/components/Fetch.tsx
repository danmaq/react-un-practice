import React from 'react';
import fetchActions from '../hooks/contexts/fetch/actions';
import fetchReducer, { Item } from '../hooks/contexts/fetch/reducer';
import type { WithoutChildren } from './types';

/** DOM 要素のための型定義。 */
interface DOMProps extends WithoutChildren {
  /** フェッチ結果一覧。 */
  readonly items?: readonly Item[];
  /** 一覧消去のボタンを押下した際における、コールバック。 */
  readonly onClickClear?: React.MouseEventHandler<HTMLButtonElement>;
  /** フェッチ ボタンを押下した際における、コールバック。 */
  readonly onClickFetch?: React.MouseEventHandler<HTMLButtonElement>;
}

/** フェッチ表示のための、副作用を持たない DOM 要素。 */
const DOM: React.FC<DOMProps> = ({
  items = [],
  onClickClear,
  onClickFetch,
}) => (
  <section>
    <button onClick={onClickFetch} type="button">
      Fetch to “api.github.com”
    </button>
    <button onClick={onClickClear} type="button">
      Clear the history
    </button>
    <ol>
      {items.length ? (
        items.map(({ counter, time }, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            It took <strong>{time}ms</strong> to fetch, and the counter was “
            <strong>{counter}</strong>”.
          </li>
        ))
      ) : (
        <li>Empty data</li>
      )}
    </ol>
  </section>
);
DOM.displayName = 'FetchDOM';

/** フェッチ表示・制御のための、副作用を取得するためのカスタムフック。 */
const useSideEffect = () => {
  // ここでは Actions・Reducer 双方にアクセスできる。
  // Reducer への直接 Dispatch も一応可能だが、Actions を介する方が行儀良い。
  const { addAsync, clear } = fetchActions.useContainer();
  const [{ items }] = fetchReducer.useContainer();
  return Object.freeze<DOMProps>({
    items,
    onClickClear: clear,
    onClickFetch: addAsync,
  });
};

/** 副作用と結合した、フェッチ表示＆制御コンポーネント。 */
const Component: React.FC<WithoutChildren> = () => {
  const { items, onClickClear, onClickFetch } = useSideEffect();
  return (
    <DOM
      items={items}
      onClickClear={onClickClear}
      onClickFetch={onClickFetch}
    />
  );
};
Component.displayName = 'Fetch';

export default Component;
