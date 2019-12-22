import * as express from 'express';
// import {getRepository} from 'typeorm';`
import Controller from '../interfaces/controller.interface';
import Dixit from '../models/Game';

export class GameController implements Controller {
    public path = '/game';
    public router = express.Router();


    constructor() {
        this.initializeRoutes();
    }
    
    private initializeRoutes() {
        this.router.get(`${this.path}/serve`, this.serveCards);
    }

    private serveCards = async (request: express.Request, response: express.Response) => {
        const game = new Dixit( //get from db
            [
                {
                    id: 1,
                    name: 'Johnny Depp',
                    cards: []
                },
                {
                    id: 2,
                    name: 'Brad Pitt',
                    cards: []
                },
                {
                    id: 3,
                    name: 'Elon Musk',
                    cards: []
                }
                {
                    id: 1,
                    name: 'Johnny Depp',
                    cards: []
                },
                {
                    id: 2,
                    name: 'Brad Pitt',
                    cards: []
                },
                {
                    id: 3,
                    name: 'Elon Musk',
                    cards: []
                },
                {
                    id: 3,
                    name: 'Elon Musk',
                    cards: []
                }
            ]
        );
        const result = await game.serveCards();
        response.send(result);
    }
}