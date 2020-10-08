import type { Props, Provider } from './combine';

export interface Register {
  readonly actions?: Provider;
  readonly reducer?: Provider;
}

const createProvidersGetter = (
  selector: (register: Register) => Provider | undefined
) => (contexts: readonly Register[]) =>
  contexts.map(selector).filter((v): v is Provider => !!v);

const getActions = createProvidersGetter(({ actions }) => actions);

const getReducers = createProvidersGetter(({ reducer }) => reducer);

export default (contexts: readonly Register[]) =>
  Object.freeze<Props>({
    actions: getActions(contexts),
    reducers: getReducers(contexts),
  });
