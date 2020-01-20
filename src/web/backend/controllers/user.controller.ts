import * as express from 'express';
import {getRepository} from 'typeorm';
import Controller from '../interfaces/controller.interface';
import {DixitUser} from '../entities/User';
import EmailSender from '../authentication/EmailSender';

export class UserController implements Controller {
    public path = '/users';
    public router = express.Router();
    private userRepository = getRepository(DixitUser);

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllUsers);
        this.router.delete(`${this.path}/:id`, this.banUser)
        this.router.put(`${this.path}/:id`, this.updateUser)
    }

    private getAllUsers = async (request: express.Request, response: express.Response) => {
        const users = await this.userRepository
            .createQueryBuilder('user')
            .getMany();
        response.send(users);
    };

    private banUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        await this.userRepository
        .createQueryBuilder()
        .update(DixitUser)
        .set({ is_banned: false })
        .where("user_id = :id", { id: id })
        .execute();
        response.status(200).end();
        const user = await this.userRepository
        .findOne({where: {user_id: id}}) as DixitUser
        // EmailSender.getTransporterInstance().sendBanNotification(user);
    }
    private updateUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id
        await this.userRepository
        .createQueryBuilder()
        .update(DixitUser)
        .set({ 
            nickname: request.body.firstName, 
            email: request.body.email,
        })
        .where("user_id = :id", { id: id })
        .execute();
        response.status(200).end()
    }
}
