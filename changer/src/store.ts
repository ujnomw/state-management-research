import { Dispatch, Store } from './types';

export const createStore = <S>(initialState: S): Store<S> => {
  let state: S = { ...initialState };
  let subscribers: Function[] = [];

  const dispatch: Dispatch<S> = changer => {
    state = changer(state);
    subscribers.forEach(s => {
      s();
    });
  };

  const subscribe = (fn: Function) => {
    subscribers.push(fn);
  };
  return { dispatch, getState: () => ({ ...state }), subscribe };
};
