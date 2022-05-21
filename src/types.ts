type Changer<S> = (state: S) => S;

type ChangerCreator<T, S> = (payload: T) => Changer<S>;

type Dispatch<S> = (changer: Changer<S>) => void;

type Unsubscribe = () => void;

type Subscribe = (fn: Function) => Unsubscribe;

type Selector<S, R> = (state: S, ...params: any[]) => R;

type SelectorsObj<S> = {
  [p: string]: Selector<S, any>;
};

interface Store<S> {
  dispatch: Dispatch<S>;
  getState(): S;
  subscribe: Subscribe;
  selectors: { [p: keyof SelectorsObj<S>]: Function };
}

export {
  Changer,
  ChangerCreator,
  Store,
  Dispatch,
  Unsubscribe,
  Subscribe,
  Selector,
  SelectorsObj,
};
