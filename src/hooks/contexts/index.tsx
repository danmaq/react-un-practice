import React from 'react';
import Combine from './combine';
import counterContext from './counter';
import fetchContext from './fetch';
import type { Register } from './type';

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
