import React from 'react';
import type { ContainerProviderProps } from 'unstated-next';

interface DOMProps {
  readonly providers: readonly Provider[];
}

export interface Props {
  readonly actions: readonly Provider[];
  readonly reducers: readonly Provider[];
}

export type Provider = React.ComponentType<ContainerProviderProps>;

const DOM: React.FC<DOMProps> = ({ children, providers }) =>
  providers.reduce(
    (acc, Provider) => <Provider>{acc}</Provider>,
    <>{children}</>
  );
DOM.displayName = 'CombinedContextsDOM';

const Component: React.FC<Props> = ({ actions, children, reducers }) => (
  <DOM providers={reducers}>
    <DOM providers={actions}>{children}</DOM>
  </DOM>
);
Component.displayName = 'CombinedContexts';

export default Component;
