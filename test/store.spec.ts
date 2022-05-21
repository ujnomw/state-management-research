import createStore from '../src';
import { State } from './types';

describe('store', () => {
  test('create store with selectors', () => {
    const initialState: State = { count: 0 };

    const { selectors, getState } = createStore<State>(initialState, {
      ['count']: state => state.count,
    });

    expect(selectors.count(getState())).toEqual(initialState.count);
    expect(selectors.count(getState())).toEqual(initialState.count);
  });
});
