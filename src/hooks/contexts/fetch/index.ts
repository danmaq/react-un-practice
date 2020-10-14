import type { Provider } from '../base/Combine';
import { ACTIONS, ConcretedLayer, REDUCER } from '../base/order';
import actions from './actions';
import reducer from './reducer';

/** コンテキストの結合用オブジェクト。 */
const layers: ConcretedLayer<Provider> = {
  [ACTIONS]: actions.Provider,
  [REDUCER]: reducer.Provider,
};

export default layers;
