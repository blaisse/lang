import { FETCH_NOUN, RESET_NOUN } from '../../../../actions';
import nounReducer from '../../nounReducer';

it('handles received noun', () => {
    expect.assertions(2);
    const action = { 
        type: FETCH_NOUN,
        payload: {
            data: { word: 'maison', meaning: 'house', article: 'la' }
        }
     };
    const state = nounReducer(null, action);
    expect(typeof state).toEqual('object');
    expect(state.word).toEqual('maison');
});

it('resets noun', () => {
    const action = {
        type: RESET_NOUN,
        payload: {}
    };
    const state = nounReducer({ word: 'maison', meaning: 'house' }, action);
    expect(Object.keys(state).length).toEqual(0);
    expect(state.word).toEqual(undefined);
});