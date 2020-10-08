import React from 'react';
import { createContainer } from 'unstated-next';
import counterReducer from '../counter/reducer';
import reducer, { add, clear } from './reducer';

export interface Actions {
  readonly addAsync: () => Promise<void>;
  readonly clear: () => void;
}

const timeAsync = async () => {
  const request = new Request('https://api.github.com/users/danmaq/repos');
  const started = Date.now();
  await (await fetch(request)).json();
  return Date.now() - started;
};

const useActions = () => {
  const [{ counter }] = counterReducer.useContainer();
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

const Container = createContainer(useActions);
Container.Provider.displayName = 'FetchAction';

export default Container;
