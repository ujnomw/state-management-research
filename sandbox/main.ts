const {} = require('../src')


const {change, getState} = createStore('a');

const stringStateChanger: ChangerCreator<string, string> = (payload: string) => (_) => payload;

document.getElementById('root').addEventListener('click', () => {change(stringStateChanger('f')); console.log('me');})