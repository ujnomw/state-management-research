import {
  ChangerCreator,
  Dispatch,
  Effect,
  EffectHandler,
  SelectorsObj,
  Store,
  Subscribe,
  Unsubscribe,
} from './types';
import { memoize } from './utils';

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
    acc[key] = memoize(selector);
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
  const effectHandler: EffectHandler<S> = async <T>(
    effect: Effect<T>,
    success?: ChangerCreator<T, S>
  ) => {
    effect().then(v => {
      if (success !== undefined) dispatch(success(v));
    });
  };

  return {
    dispatch,
    getState,
    subscribe,
    selectors: reducedSelectors,
    effectHandler,
  };
};
