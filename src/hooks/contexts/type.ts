import type React from 'react';
import type { ContainerProviderProps } from 'unstated-next';

export type Action<T extends PropertyKey, P = undefined> = Readonly<
  ActionType<T> & (P extends undefined ? Partial<Payload<P>> : Payload<P>)
>;

interface ActionType<T extends PropertyKey> {
  readonly type: T;
}

interface Payload<T> {
  readonly payload: T;
}

export interface Register {
  readonly actions: readonly React.ComponentType<
    ContainerProviderProps<void>
  >[];
  readonly reducer: React.ComponentType<ContainerProviderProps<void>>;
}
