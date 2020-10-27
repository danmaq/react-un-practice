import React from 'react';
import { createContainer } from 'unstated-next';
import type { Provider } from './base/Combine';
import { ACTIONS, ConcretedLayer } from './base/order';

/** エフェクトのみで、コンテキストとしての機能を何も提供しないアクション。 */
const Container = createContainer(() =>
  // eslint-disable-next-line no-console
  React.useEffect(() => console.log('** Effected the foo! **'), [])
);
Container.Provider.displayName = 'FooAction';

/** コンテキストの結合用オブジェクト。 */
const layers: ConcretedLayer<Provider> = { [ACTIONS]: Container.Provider };

export default layers;
