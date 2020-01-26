import { VOTE_CARD } from '../constants';

export const voteCard = (card: {card_id: number, card_path: string}) => ({
    type: VOTE_CARD,
    payload: {
        card
    }
});
