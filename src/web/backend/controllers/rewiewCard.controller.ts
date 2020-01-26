import * as express from 'express';
import { getRepository } from 'typeorm';
import Controller from '../interfaces/controller.interface';
import { ReviewCard } from '../entities/ReviewCard';
import { Card } from '../entities/Card';
import fs from 'fs';
import * as mime from 'mime';


export class ReviewCardsController implements Controller {
    public path = '/reviewcards';
    public cardspath = '/cards';
    public router = express.Router();
    private reviewCardRepository = getRepository(ReviewCard);
    private CardRepository = getRepository(Card);

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getReviewCard);
        this.router.delete(`${this.path}/:id`, this.deleteReviewCardFromDB);
        this.router.delete(`${this.cardspath}/:id`, this.rejectCard);
        this.router.post(`${this.cardspath}`, this.addReviewCardToCards);
    }

    private getReviewCard = async (request: express.Request, response: express.Response) => {
        const reviewcards = await this.reviewCardRepository
            .createQueryBuilder('card')
            .getMany();
        response.send(reviewcards);
    };

    private deleteReviewCardFromDB = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        const deleteResponse = await this.reviewCardRepository.delete(id);
        if (deleteResponse.affected) {
            response.status(200).end();
        }
    }

    private rejectCard = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        const card: any = await this.reviewCardRepository
            .findOne({ where: { card_id: id } })
        const deleteResponse = await this.reviewCardRepository.delete(id);
        if (deleteResponse.affected) {
            response.status(200).end();
        }

        fs.unlink(`./public/images/cards/${card.card_path}`, (err) => {
            if (err) throw err;
            console.log(`./public/images/cards/${card.card_path} was deleted`);
        });
    }

    private addReviewCardToCards = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const newCard = this.CardRepository.create({
            card_path: `${request.body.card_path}`
        });
        console.log(newCard);
        await this.CardRepository.save(newCard);
        response.status(200).end();
    };

}
