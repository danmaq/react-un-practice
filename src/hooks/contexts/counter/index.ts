import type { Register } from '../type';
import actions from './actions';
import reducer from './reducer';

export default Object.freeze<Register>({
  actions: [actions.Provider],
  reducer: reducer.Provider,
});
