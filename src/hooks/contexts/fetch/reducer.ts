import createReducer, { Action } from '../base/createReducer';

export const add = Symbol('add');
export const clear = Symbol('clear');

export interface Item {
  readonly time: number;
  readonly counter: number;
}

export interface State {
  readonly items: readonly Item[];
}

export default createReducer<
  State,
  Action<typeof add, Item> | Action<typeof clear>
>({
  initialState: { items: [] },
  reducer: (state, action) => {
    switch (action.type) {
      case add:
        return { ...state, items: [...state.items, action.payload] };
      case clear:
        return { ...state, items: [] };
      default:
        return state;
    }
  },
  name: 'Fetch',
});
