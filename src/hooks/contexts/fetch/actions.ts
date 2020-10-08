import React from 'react';
import { createContainer } from 'unstated-next';
import counterReducer from '../counter/reducer';
import reducer, { add, clear } from './reducer';

const getFetchTimeAsync = async () => {
  const started = Date.now();
  await fetch(new Request('https://api.github.com/users/danmaq/repos'));
  return Date.now() - started;
};

const useActions = () => {
  const [{ counter }] = counterReducer.useContainer();
  const [, dispatch] = reducer.useContainer();
  return {
    addAsync: React.useCallback(async () => {
      dispatch({
        type: add,
        payload: { time: await getFetchTimeAsync(), counter },
      });
    }, [counter, dispatch]),
    clear: React.useCallback(() => dispatch({ type: clear }), [dispatch]),
  } as const;
};

const Container = createContainer(useActions);
Container.Provider.displayName = '[ACTIONS] Fetch';

export default Container;
