import type { Register } from '../base/createCombineProps';
import actions from './actions';
import reducer from './reducer';

/** コンテキストの結合用オブジェクト。 */
export default Object.freeze<Register>({
  actions: actions.Provider,
  reducer: reducer.Provider,
});
