import React from 'react';
import counterActions from '../hooks/contexts/counter/actions';
import counterReducer from '../hooks/contexts/counter/reducer';
import type { WithoutChildren } from './types';

interface DOMProps extends WithoutChildren {
  readonly counter: number;
  readonly onChangeCounter?: React.ChangeEventHandler<HTMLInputElement>;
  readonly onClickAdd?: React.MouseEventHandler<HTMLButtonElement>;
}

const DOM: React.FC<DOMProps> = ({ counter, onChangeCounter, onClickAdd }) => (
  <section>
    <p>
      Counter: <strong>{counter}</strong>
    </p>
    <label htmlFor="counter">
      Set counter:
      <input
        defaultValue={counter}
        id="counter"
        name="counter"
        onChange={onChangeCounter}
        type="number"
      />
    </label>
    <button onClick={onClickAdd} type="button">
      +1
    </button>
  </section>
);
DOM.displayName = 'CounterDOM';

const useSideEffect = () => {
  const { add, set } = counterActions.useContainer();
  const [{ counter }] = counterReducer.useContainer();
  return Object.freeze<DOMProps>({
    counter,
    onChangeCounter: React.useCallback(
      (e) => set(Number.parseInt(e.currentTarget.value, 10)),
      [set]
    ),
    onClickAdd: add,
  });
};

const Component: React.FC<WithoutChildren> = () => {
  const { counter, onChangeCounter, onClickAdd } = useSideEffect();
  return (
    <DOM
      counter={counter}
      onChangeCounter={onChangeCounter}
      onClickAdd={onClickAdd}
    />
  );
};
Component.displayName = 'Counter';

export default Component;
