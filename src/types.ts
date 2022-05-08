type Changer<S> = (state: S) => S;

type ChangerCreator<T, S> = (payload: T) => Changer<S>;

type Dispatch<S> = (changer: Changer<S>) => void;

interface Store<S> {
  dispatch: Dispatch<S>;
  getState(): S;
  subscribe(fn: Function): void;
}

export { Changer, ChangerCreator, Store, Dispatch };
