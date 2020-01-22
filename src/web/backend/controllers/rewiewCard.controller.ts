import * as express from 'express';
import { getRepository } from 'typeorm';
import Controller from '../interfaces/controller.interface';
import { ReviewCard } from '../entities/ReviewCard';

export class ReviewCardsController implements Controller {
    public path = '/reviewcards';
    public router = express.Router();
    private reviewCardRepository = getRepository(ReviewCard);

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getReviewCard);
    }

    private getReviewCard = async (request: express.Request, response: express.Response) => {
        const reviewcards = await this.reviewCardRepository
            .createQueryBuilder('card')
            .getMany();
        response.send(reviewcards);
    };
    
}
