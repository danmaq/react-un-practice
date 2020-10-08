import React from 'react';
import fetchActions from '../hooks/contexts/fetch/actions';
import fetchReducer, { Item } from '../hooks/contexts/fetch/reducer';
import type { WithoutChildren } from './types';

interface DOMProps extends WithoutChildren {
  readonly items?: readonly Item[];
  readonly onClickClear?: React.MouseEventHandler<HTMLButtonElement>;
  readonly onClickFetch?: React.MouseEventHandler<HTMLButtonElement>;
}

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

const useSideEffect = () => {
  const { addAsync, clear } = fetchActions.useContainer();
  const [{ items }] = fetchReducer.useContainer();
  return Object.freeze<DOMProps>({
    items,
    onClickClear: clear,
    onClickFetch: addAsync,
  });
};

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
