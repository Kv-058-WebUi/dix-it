import * as express from 'express';
import {getRepository} from 'typeorm';
import bcryptjs from 'bcryptjs'
import Controller from '../interfaces/controller.interface';
import {DixitUser} from '../entities/User';
import EmailSender from '../authentication/EmailSender';
import { fstat } from 'fs';

export class UserController implements Controller {
    public path = '/users';
    public router = express.Router();
    private userRepository = getRepository(DixitUser);

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllUsers);
        this.router.put(`${this.path}/:id/ban`, this.banUser);
        this.router.put(`${this.path}/:id/unban`, this.unbanUser);
        this.router.put(`${this.path}/:id`, this.updateUser);
        this.router.get(`${this.path}/:id/dropPass`, this.dropPass);
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
        .set({ is_banned: true })
        .where("user_id = :id", { id: id })
        .execute();
        response.status(200).end();
        const user = await this.userRepository
        .findOne({where: {user_id: id}}) as DixitUser
        EmailSender.getTransporterInstance().sendBanNotification(user, request.body.banReason);
    }

    private unbanUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
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
        EmailSender.getTransporterInstance().sendBanNotification(user, undefined);
    }

    private updateUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        try {
            await this.userRepository
            .createQueryBuilder()
            .update(DixitUser)
            .set({ 
                nickname: request.body.nickname, 
                email: request.body.email,
            })
            .where("user_id = :id", { id: id })
            .execute();
            response.status(200).end()
        }
        catch(error) {
            response.send({
                error: 'Something went wrong!'
            })
            console.log(error);
        }      
    }
    private dropPass = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        let password = '!1A';
        let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let string_length = 8;
        for (var i=0; i<string_length; i++) {
            let rnum = Math.floor(Math.random() * chars.length);
            password += chars.substring(rnum,rnum+1);
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        await this.userRepository
        .createQueryBuilder()
        .update(DixitUser)
        .set({
            password: hashedPassword
        })
        .where("user_id = :id", { id: id })
        .execute();
        response.status(200).end()
        const user = await this.userRepository
        .findOne({where: {user_id: id}}) as DixitUser
        EmailSender.getTransporterInstance().sendNewPassword(user, password);
    }
}
