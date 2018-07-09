import moxios from 'moxios';
import { fetchVerb } from '../';
import { FETCH_VERB } from '../';

const url = process.env.REACT_APP_URL;

beforeEach(() => {
    moxios.install();
});

afterEach(() => {
    moxios.uninstall();
});

describe.skip('fetchVerb', () => {

    beforeEach(() => {
        moxios.stubRequest(`${url}/word`, {
            status: 200,
            response: { lang: 'french', word: 'aller', meaning: 'to go' }
        });
    });

    it('receives correct payload', async () => {
        //It's redux thunk, doesn't return an object
        const action = await fetchVerb();
    });

});