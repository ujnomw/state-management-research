import { Changer, Store } from "./types";
export {ChangerCreator} from "./types"

export const createStore = <S> (initialState: S): Store => {
    let state: S = {...initialState};
    const change = (changer: Changer) => {
        state = changer(state);
    }
    return {change, getState: () => ({...state})}
}


