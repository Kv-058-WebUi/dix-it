import { Card } from "../entities/Card";
import { getRepository } from "typeorm";

export interface Users {
    id: number;
    name: string;
    cards: Card[];
}

export class Dixit {
    players: Users[];
    cardsPerPlayer: number;
    private cardRepository = getRepository(Card);
    
    constructor(players: Users[]) {
        if (players.length < 3 || players.length > 7) {
            throw new Error('Wrong quantity of players');
        }
        this.players = players;
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
            } else { const cardQuantity = cardDeck.length;
                    const index = Math.floor(Math.random() * cardQuantity);
                    const currentCard = cardDeck[index];
                    player.cards.push(currentCard);
                    cardDeck.splice(index, 1);
            }
            return player;
        });
    }
}