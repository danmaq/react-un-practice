import type React from 'react';
import type { ContainerProviderProps } from 'unstated-next';
import type { Props } from './combine';

export interface Register {
  readonly actions?: readonly React.ComponentType<ContainerProviderProps>[];
  readonly reducer?: React.ComponentType<ContainerProviderProps>;
}

export default (contexts: readonly Register[]) =>
  Object.freeze<Props>({
    actions: contexts
      .flatMap(({ actions }) => actions)
      .filter((v): v is React.ComponentType<ContainerProviderProps> => !!v),
    reducers: contexts
      .map(({ reducer }) => reducer)
      .filter((v): v is React.ComponentType<ContainerProviderProps> => !!v),
  });
