import React from 'react';
import counterActions from '../hooks/contexts/counter/actions';
import counterReducer from '../hooks/contexts/counter/reducer';
import type { WithoutChildren } from './types';

/** DOM 要素のための型定義。 */
interface DOMProps extends WithoutChildren {
  /** カウンターの値。 */
  readonly counter: number;
  /** カウンターを直接編集した際のコールバック。 */
  readonly onChangeCounter?: React.ChangeEventHandler<HTMLInputElement>;
  /** `+1` ボタンを押下した際のコールバック。 */
  readonly onClickAdd?: React.MouseEventHandler<HTMLButtonElement>;
}

/** カウンター表示のための、副作用を持たない DOM 要素。 */
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

/** カウンター表示・制御のための、副作用を取得するためのカスタムフック。 */
const useSideEffect = () => {
  // ここでは Actions・Reducer 双方にアクセスできる。
  // Reducer への直接 Dispatch も一応可能だが、Actions を介する方が行儀良い。
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

/** 副作用と結合した、カウンター表示＆制御コンポーネント。 */
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
