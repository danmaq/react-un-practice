import React from 'react';
import { createContainer } from 'unstated-next';
import reducer, { add, set } from './reducer';

export interface Actions {
  readonly add: () => void;
  readonly set: (value: number) => void;
}

const useActions = () => {
  const [, dispatch] = reducer.useContainer();
  return Object.freeze<Actions>({
    add: React.useCallback(() => dispatch({ type: add }), [dispatch]),
    set: React.useCallback(
      (value: number) => dispatch({ type: set, payload: value }),
      [dispatch]
    ),
  });
};

const Container = createContainer(useActions);
Container.Provider.displayName = 'CounterAction';

export default Container;
