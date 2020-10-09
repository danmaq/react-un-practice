import React from 'react';
import { createContainer } from 'unstated-next';
import reducer, { increment, set } from './reducer';

/** カウンターにおける、アクションの型定義。 */
export interface Actions {
  /** カウンターをインクリメントします。 */
  readonly increment: () => void;
  /** カウンターを指定の値で上書きします。 */
  readonly set: (
    /** 値。 */
    value: number
  ) => void;
}

/** カウンターにおける、アクションを作成します。 */
const useActions = () => {
  // see: https://ja.reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
  // > useReducer から返される dispatch 関数は常に同一性が保たれます。
  // この主張を信用し、各メモ化工程で dispatch を deps 指定しています。
  const [, dispatch] = reducer.useContainer();
  return Object.freeze<Actions>({
    increment: React.useCallback(() => dispatch({ type: increment }), [
      dispatch,
    ]),
    set: React.useCallback(
      (value: number) => dispatch({ type: set, payload: value }),
      [dispatch]
    ),
  });
};

/** カウンターにおける、アクション コンテキスト。 */
const Container = createContainer(useActions);
Container.Provider.displayName = 'CounterAction';

export default Container;
