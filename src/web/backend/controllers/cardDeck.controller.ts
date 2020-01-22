import * as express from 'express';
import { getRepository } from 'typeorm';
import Controller from '../interfaces/controller.interface';
import { Card } from '../entities/Card';

export class CardDeckController implements Controller {
    public path = '/cards';
    public router = express.Router();
    private cardRepository = getRepository(Card);

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getCardDeck);
    }

    private getCardDeck = async (request: express.Request, response: express.Response) => {
        const carddeck = await this.cardRepository
            .createQueryBuilder('card')
            .getMany();
        response.send(carddeck);
    };
    
}
