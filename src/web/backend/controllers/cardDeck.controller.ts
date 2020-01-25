import * as express from 'express';
import { getRepository } from 'typeorm';
import Controller from '../interfaces/controller.interface';
import { Card } from '../entities/Card';
import fs from 'fs';
export class CardDeckController implements Controller {
    public path = '/cards';
    public router = express.Router();
    private cardRepository = getRepository(Card);

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getCardDeck);
        this.router.delete('/cards/:id', this.deleteCard);
    }

    private getCardDeck = async (request: express.Request, response: express.Response) => {
        const carddeck = await this.cardRepository
            .createQueryBuilder('card')
            .getMany();
        response.send(carddeck);
    };
    
    private deleteCard = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        const card:any = await this.cardRepository
        .findOne({where: { card_id: id}})
        const deleteResponse = await this.cardRepository.delete(id);
        if (deleteResponse.affected) {
          response.status(200).end();
        }

        fs.unlink(`./public/images/cards/${card.card_path}`, (err) => {
            if (err) throw err;
            console.log('path/card_url was deleted');
        }); 
    }
    
    
}
