type Changer<S = any> = (state: S) => S

type ChangerCreator<T, S> = (payload: T) => Changer<S>

type Selector<T> = () => T

interface Store {
    change(changer: Changer): void;
    getState(): any;
}

export {
    Changer, ChangerCreator, Selector, Store
}  