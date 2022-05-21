import { Dispatch, SelectorsObj, Store, Subscribe, Unsubscribe } from './types';
import { meoize } from './utils';

export const createStore = <S>(
  initialState: S,
  selectorsObj: SelectorsObj<S> = {}
): Store<S> => {
  let state: S = { ...initialState };

  let subscribers: Function[] = [];

  const getState = () => ({ ...state });

  const reducedSelectors = Object.entries(selectorsObj).reduce<{
    [p: string]: Function;
  }>((acc, [key, selector]) => {
    acc[key] = meoize(selector);
    return acc;
  }, {});

  const dispatch: Dispatch<S> = changer => {
    state = changer(state);
    subscribers.forEach(s => {
      s();
    });
  };

  const subscribe: Subscribe = (fn: Function) => {
    subscribers.push(fn);
    const unsubscribe: Unsubscribe = () => {
      subscribers = subscribers.filter(s => s !== fn);
    };
    return unsubscribe;
  };

  return {
    dispatch,
    getState,
    subscribe,
    selectors: reducedSelectors,
  };
};
