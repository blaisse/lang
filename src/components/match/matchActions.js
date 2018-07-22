import axios from 'axios';
import { FETCH_MATCH_SET } from './matchTypes';

const url = process.env.REACT_APP_URL;

export const fetch_match_set = () => async (dispatch, getState) => {
    //get size from user?
    const { lang } = getState();
    const user = localStorage.getItem('username');

    const res = await axios.get(`${url}/set/noun?lang=${lang}&size=5`);
    dispatch({ type: FETCH_MATCH_SET, payload: res });
}