import React from 'react';
import Combine from './combine';
import type { Register } from './base/createCombineProps';
import counterContext from './counter';
import fetchContext from './fetch';

const contexts: readonly Register[] = [counterContext, fetchContext];

const Contexts: React.FC = ({ children }) => (
  <Combine
    actions={contexts.flatMap(({ actions }) => actions)}
    reducers={contexts.map(({ reducer }) => reducer)}
  >
    {children}
  </Combine>
);
Contexts.displayName = 'Contexts';

export default Contexts;
