import * as express from 'express';
import {getRepository} from 'typeorm';
import Controller from '../interfaces/controller.interface';
import {DixitUser} from '../entities/User';

export class UserController implements Controller {
    public path = '/users';
    public router = express.Router();
    private userRepository = getRepository(DixitUser);

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllUsers);
    }

    private getAllUsers = async (request: express.Request, response: express.Response) => {
        const users = await this.userRepository
            .createQueryBuilder('user')
            .getMany();
        response.send(users);
    };
}
