import * as express from 'express';
// import {getRepository} from 'typeorm';`
import Controller from '../interfaces/controller.interface';
import { Dixit, Users } from '../models/Game';

// todo: remove after demo, use real rooms instead
export class DemoController implements Controller {
    public path = '/demo';
    public router = express.Router();
    public players: Users[] = [];
    public counter = 0;

    constructor() {
        this.initializeRoutes();
        this.initDemoRoom();
    }
    
    private initializeRoutes() {
        this.router.get(`${this.path}/serve`, this.serveCards);
        this.router.get(`${this.path}/players`, this.getPlayers);
    }

    private randomPlayers() {
        return [
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
                id: 4,
                name: 'Tom Hanks',
                cards: []
            },
            {
                id: 5,
                name: 'Tom Cruise',
                cards: []
            },
            {
                id: 6,
                name: 'Keanu Reeves',
                cards: []
            }
        ];
    }

    private initDemoRoom = async () => {
        const players = this.randomPlayers();
        const game = new Dixit(players);
        this.players = await game.serveCards();
    }

    private getPlayers = (request: express.Request, response: express.Response) => {
        const players = this.randomPlayers();
        response.send(players);
    }

    private serveCards = (request: express.Request, response: express.Response) => {
        const player = this.players[this.counter];
        this.counter++;
        if (this.counter === 6) {
            this.counter = 0;
        }
        response.send(player.cards);
    }
}