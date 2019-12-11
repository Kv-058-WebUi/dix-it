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

    private deleteUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        const deleteResponse = await this.userRepository.delete(id);
        if (deleteResponse.raw[1]) {
          response.sendStatus(200);
        }
    }
}
