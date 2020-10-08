import React from 'react';
import { createContainer } from 'unstated-next';
import reducer, { add, set } from './reducer';

const useActions = () => {
  const [, dispatch] = reducer.useContainer();
  return {
    add: React.useCallback(() => dispatch({ type: add }), [dispatch]),
    set: React.useCallback(
      (value: number) => dispatch({ type: set, payload: value }),
      [dispatch]
    ),
  } as const;
};

const Container = createContainer(useActions);
Container.Provider.displayName = '[ACTIONS] Counter';

export default Container;
