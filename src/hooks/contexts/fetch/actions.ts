import React from 'react';
import { createContainer } from 'unstated-next';
import counterReducer from '../counter/reducer';
import reducer, { add, clear } from './reducer';

/** フェッチ ログにおける、アクションの型定義。 */
export interface Actions {
  /** 非同期的にフェッチを行い、経過時間やその時のカウンター値をログに追加します。 */
  readonly addAsync: () => Promise<void>;
  /** フェッチ ログを全件削除します。 */
  readonly clear: () => void;
}

/** 非同期的にフェッチを行い、所要時間をミリ秒単位で取得します。 */
const timeAsync = async () => {
  const started = Date.now();
  // 単に繋いでいる間待つだけ。単に非同期で動くことを検証したい
  // だけの代物なので、ダミーウェイトで代用しても構わない。
  const request = new Request('https://api.github.com/users/danmaq/repos');
  await (await fetch(request)).json();
  return Date.now() - started;
};

/** フェッチ ログにおける、アクションを作成します。 */
const useActions = () => {
  const [{ counter }] = counterReducer.useContainer();
  // see: https://ja.reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
  // > useReducer から返される dispatch 関数は常に同一性が保たれます。
  // この主張を信用し、各メモ化工程で dispatch を deps 指定しています。
  const [, dispatch] = reducer.useContainer();
  return Object.freeze<Actions>({
    addAsync: React.useCallback(
      async () =>
        dispatch({ type: add, payload: { time: await timeAsync(), counter } }),
      [counter, dispatch]
    ),
    clear: React.useCallback(() => dispatch({ type: clear }), [dispatch]),
  });
};

/** フェッチ ログにおける、アクション コンテキスト。 */
const Container = createContainer(useActions);
Container.Provider.displayName = 'FetchAction';

export default Container;
