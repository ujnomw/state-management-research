type Changer<S> = (state: S) => S;

type ChangerCreator<T, S> = (payload: T) => Changer<S>;

type Dispatch<S> = (changer: Changer<S>) => void;

type Unsubscribe = () => void;

type Subscribe = (fn: Function) => Unsubscribe;

interface Store<S> {
  dispatch: Dispatch<S>;
  getState(): S;
  subscribe: Subscribe;
}

export { Changer, ChangerCreator, Store, Dispatch, Unsubscribe, Subscribe };
