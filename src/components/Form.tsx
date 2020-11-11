import React from 'react';
import actions from '../hooks/contexts/form/actions';
import { useCounter, useText } from '../hooks/contexts/form/reducer';
import type { WithoutChildren } from './types';

/** DOM 要素のための型定義。 */
interface DOMProps extends WithoutChildren {
  /** カウンターの値。 */
  readonly counter: number;
  /** カウンターを直接編集した際のコールバック。 */
  readonly onChangeCounter?: React.ChangeEventHandler<HTMLInputElement>;
  /** テキストを直接編集した際のコールバック。 */
  readonly onChangeText?: React.ChangeEventHandler<HTMLInputElement>;
  /** `+1` ボタンを押下した際のコールバック。 */
  readonly onClickAdd?: React.MouseEventHandler<HTMLButtonElement>;
  /** テキストの値。 */
  readonly text: string;
}

/** フォーム表示のための、副作用を持たない DOM 要素。 */
const DOM: React.FC<DOMProps> = ({
  counter,
  onChangeCounter,
  onChangeText,
  onClickAdd,
  text,
}) => (
  <section>
    <p>
      Value: <strong>{counter}</strong> ({text})
    </p>
    <div>
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
    </div>
    <div>
      <label htmlFor="text">
        Set text:
        <input
          defaultValue={text}
          id="text"
          name="text"
          onChange={onChangeText}
          type="text"
        />
      </label>
    </div>
  </section>
);
DOM.displayName = 'CounterDOM';

/** フォーム表示・制御のための、副作用を取得するためのカスタムフック。 */
const useSideEffect = () => {
  // ここでは Actions・Reducer 双方にアクセスできる。
  // Reducer への直接 Dispatch も一応可能だが、Actions を介する方が行儀良い。
  const { increment, setCounter, setText } = actions.useContainer();
  const { counter } = useCounter();
  const { text } = useText();
  return Object.freeze<DOMProps>({
    counter,
    onChangeCounter: React.useCallback(
      (e) => setCounter(Number.parseInt(e.currentTarget.value, 10)),
      [setCounter]
    ),
    onChangeText: React.useCallback((e) => setText(e.currentTarget.value), [
      setText,
    ]),
    onClickAdd: increment,
    text,
  });
};

/** 副作用と結合した、フォーム表示＆制御コンポーネント。 */
const Component: React.FC<WithoutChildren> = () => {
  const {
    counter,
    onChangeCounter,
    onChangeText,
    onClickAdd,
    text,
  } = useSideEffect();
  return (
    <DOM
      counter={counter}
      onChangeCounter={onChangeCounter}
      onChangeText={onChangeText}
      onClickAdd={onClickAdd}
      text={text}
    />
  );
};
Component.displayName = 'Counter';

export default Component;
