import React from 'react';
import { createContainer } from 'unstated-next';
import reducer from './reducer';
import { increment, set as setCounter } from './reducer/counter';
import { set as setText } from './reducer/text';

/** フォームにおける、アクションの型定義。 */
export interface Actions {
  /** カウンターをインクリメントします。 */
  readonly increment: () => void;
  /** カウンターを指定の値で上書きします。 */
  readonly setCounter: (
    /** 値。 */
    value: number
  ) => void;
  /** カウンターを指定の値で上書きします。 */
  readonly setText: (
    /** 値。 */
    value: string
  ) => void;
}

/** フォームにおける、アクションを作成します。 */
const useActions = () => {
  // see: https://ja.reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
  // > useReducer から返される dispatch 関数は常に同一性が保たれます。
  // この主張を信用し、各メモ化工程で dispatch を deps 指定しています。
  const [, dispatch] = reducer.useContainer();
  return Object.freeze<Actions>({
    increment: React.useCallback(() => dispatch({ type: increment }), [
      dispatch,
    ]),
    setCounter: React.useCallback(
      (value: number) => dispatch({ type: setCounter, payload: value }),
      [dispatch]
    ),
    setText: React.useCallback(
      (value: string) => dispatch({ type: setText, payload: value }),
      [dispatch]
    ),
  });
};

/** フォームにおける、アクション コンテキスト。 */
const Container = createContainer(useActions);
Container.Provider.displayName = 'FormAction';

export default Container;
