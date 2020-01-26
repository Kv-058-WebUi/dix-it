import { SUBMIT_CARD } from '../constants';

export const submitCard = (card: {card_id: number, card_path: string}) => ({
    type: SUBMIT_CARD,
    payload: {
        card
    }
});
