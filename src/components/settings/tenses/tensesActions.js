import { SELECTED_TENSE } from './tensesTypes';

export function selectTense(tense){
    return {
        type: SELECTED_TENSE,
        payload: tense
    };
}