import { SUBMIT_WORD } from '../constants';

export const submitWord = (word: string) => ({
    type: SUBMIT_WORD,
    payload: {
        word
    }
});
