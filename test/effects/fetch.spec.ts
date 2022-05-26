import createStore from '../../src';
import { ChangerCreator, Effect } from '../../src/types';
import { MeowFactResponse, State } from './types';

describe('fetch using effects', () => {
  it('fetch data from api', async () => {
    const fetch = jest.fn(
      async (_: string): Promise<MeowFactResponse> => ({
        data: [
          'Julius Ceasar, Henri II, Charles XI, and Napoleon were all afraid of cats.',
        ],
      })
    );
    const initialState: State = { catFact: '' };
    // fetch cat fact
    const fetchCatFactEffect: Effect<string> = async () => {
      const url = 'https://meowfacts.herokuapp.com/';

      const r = await fetch(url);

      return (r as MeowFactResponse).data[0];
    };

    // changer

    const setCatFact: ChangerCreator<string, State> = v => state => ({
      ...state,
      catFact: v,
    });

    const { effectHandler, getState, subscribe } = createStore<State>(
      initialState
    );

    subscribe(() => {
      expect(getState().catFact.length).not.toEqual(0);
    });

    await effectHandler<string>(fetchCatFactEffect, setCatFact);
  });
});
