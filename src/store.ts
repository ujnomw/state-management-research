import { Dispatch, Store, Subscribe, Unsubscribe } from './types';

export const createStore = <S>(initialState: S): Store<S> => {
  let state: S = { ...initialState };
  let subscribers: Function[] = [];

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

  return { dispatch, getState: () => ({ ...state }), subscribe };
};
