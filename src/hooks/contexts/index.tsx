import React from 'react';
import Combine from './base/combine';
import createCombineProps, { Register } from './base/createCombineProps';
import counterContext from './counter';
import fetchContext from './fetch';

const contexts: readonly Register[] = [counterContext, fetchContext];

const Component: React.FC = ({ children }) => {
  const { actions, reducers } = createCombineProps(contexts);
  return (
    <Combine actions={actions} reducers={reducers}>
      {children}
    </Combine>
  );
};
Component.displayName = 'Contexts';

export default Component;
