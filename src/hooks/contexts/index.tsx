import React from 'react';
import counter from './counter';
import type { Register } from './type';

const providers: readonly Register[] = [counter];

const sortedProviders = [
  ...providers.map(({ reducer }) => reducer),
  ...providers.map(({ actions }) => actions),
];

const Contexts: React.FC = ({ children }) =>
  sortedProviders.reduce(
    (acc, Provider) => <Provider>{acc}</Provider>,
    <>{children}</>
  );
Contexts.displayName = 'Contexts';

export default Contexts;
