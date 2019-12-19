import { Card } from "../entities/Card";
import { getRepository } from "typeorm";

interface Card {
    id: number;
    imgURL: string;
}

interface Users {
    id: number;
    name: string;
    cards: Card[];
}



// const cardDeck = [ //get from db
//     {
//         id: 1,
//         imgURL: 'card_1.png',
//     },
//     {
//         id: 2,
//         imgURL: 'card_2.png',
//     },
//     {
//         id: 3,
//         imgURL: 'card_3.png',
//     },
//     {
//         id: 4,
//         imgURL: 'card_4.png',
//     },
//     {
//         id: 5,
//         imgURL: 'card_5.png',
//     },
//     {
//         id: 6,
//         imgURL: 'card_6.png',
//     },
//     {
//         id: 7,
//         imgURL: 'card_7.png',
//     },
//     {
//         id: 8,
//         imgURL: 'card_8.png',
//     },
//     {
//         id: 9,
//         imgURL: 'card_9.png',
//     },
//     {
//         id: 10,
//         imgURL: 'card_10.png',
//     },
//     {
//         id: 11,
//         imgURL: 'card_11.png',
//     },
//     {
//         id: 12,
//         imgURL: 'card_12.png',
//     }
// ];


export default class Dixit {
    players: Users[];
    fullCardDeck: { id: number; imgURL: string; }[];
    cardsPerPlayer: number;
    private cardRepository = getRepository(Card);
    constructor(players: Users[]) {
        if (players.length < 3 || players.length > 7) {
            throw new Error('Wrong quantity of players');
        }
        this.players = players;
        this.fullCardDeck = cardDeck;
		this.cardsPerPlayer = 7;
    }

    async serveCards() {
        const cardDeck = await this.cardRepository.find();
        return this.players.map(player => {
            if (!player.cards.length) {
                for (let i = 0; i < this.cardsPerPlayer; i++) {
                    const cardQuantity = cardDeck.length;
                    const index = Math.floor(Math.random() * cardQuantity);
                    const currentCard = cardDeck[index];
                    player.cards.push(currentCard);
                    cardDeck.splice(index, 1);
                }
            } else {
                    const cardQuantity = cardDeck.length;
                    const index = Math.floor(Math.random() * cardQuantity);
                    const currentCard = cardDeck[index];
                    player.cards.push(currentCard);
                    cardDeck.splice(index, 1);
            }
            return player;
        });
    }
}