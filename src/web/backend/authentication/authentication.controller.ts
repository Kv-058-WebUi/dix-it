import * as express from 'express';
import jwt from "jsonwebtoken";
import Controller from '../interfaces/controller.interface';
import CreateUserDto from '../dto/user.dto';
import AuthenticationService from './authentication.service';
import UserWithThatEmailAlreadyExistsException from "../exceptions/UserWithThatEmailAlredyExistException";
import UserWithThatNicknameAlreadyExistsException from "../exceptions/UserWithThatNicknameAlreadyExistsException";
import UserInvalidPasswordException from '../exceptions/UserInvalidPasswordException';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import { JWT_SECRET, FRONTEND_URL, FRONTEND_PORT } from '../../../config';
import { DixitUser } from '../entities/User';
import EmailSender from "./EmailSender";
import passport from 'passport';
import { LoginUserData, JwtPayload } from './helpers';
import EmailNotConfirmedException from '../exceptions/EmailNotConfirmedException';
import { Player } from '../entities/Player';
import { getRepository } from 'typeorm';
import { uniqueNamesGenerator, Config as NamesConfig, adjectives, animals, starWars } from 'unique-names-generator';


class AuthenticationController implements Controller {
    public path = '/auth';
    public router = express.Router();
    private authenticationService = new AuthenticationService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register`, this.registration);
        this.router.post(`${this.path}/login`, this.login);
        this.router.post(`${this.path}/isAuthenticated`, this.isAuthenticated);
        this.router.post(`${this.path}/getUser`, this.getUser);
        this.router.get(`${this.path}/verify`, this.verify);
    }

    private async createToken(user: DixitUser) {
        const player = await getRepository(Player).findOne({user_id: user});
        const payload: JwtPayload = {
            authenticated: true,
            user_id: user.user_id,
            profile_picture: user.profile_picture,
            nickname: user.nickname,
            player_id: player ? player.player_id : undefined
        };

        return jwt.sign(payload, JWT_SECRET);
    }

    private verify = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            const jwt_token = request.query.jwt_token;
            const jwtData = jwt.verify(jwt_token, JWT_SECRET);
            const user_id = (jwtData as JwtPayload).user_id;

            if(user_id) {
                await this.authenticationService.verify(user_id);
            }
        } catch (e) {
            next();
        }
        
        response.redirect(`${FRONTEND_URL}:${FRONTEND_PORT}/`);
    }

    private registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const userData: CreateUserDto = request.body;
        let user: any;
        try {
            user = await this.authenticationService.register(userData);
        } catch (e) {
            if (e instanceof UserWithThatEmailAlreadyExistsException) {
                response.send({ "status": "error", "reason": "Email already exists" });
                return;
            }
            if (e instanceof UserWithThatNicknameAlreadyExistsException) {
                response.send({ "status": "error", "reason": "Nickname already exists" });
                return;
            }
        }
        const token = await this.createToken(user);
        response.send({ "status": "success", "jwt_token": token });
        EmailSender.getTransporterInstance().sendConfirmationEmailToUser(userData.email, userData.nickname, token);
    }

    private login = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const userData: LoginUserData = request.body;
        try {
            const user = await this.authenticationService.login(userData);
            const token = await this.createToken(user);
            response.send({ "jwt_token": token });
        } catch (error) {
            let message = 'Oh, noes! Something went wrong.';

            console.log(error);
            if (error instanceof UserInvalidPasswordException ||
                error instanceof UserNotFoundException) {
                message = 'Invalid login or password.';
            } else if(error instanceof EmailNotConfirmedException) {
                message = 'Please confirm your email.';
            }
            response.send({ error: message });
        }
    }

    private isAuthenticated = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            let authenticated = false;
            if (!err && !info) {
                authenticated = true;
            }
            response.send({ authenticated });
        })(request, response, next);
    }

    
    private generateGuestName(): string {
        const seed = Math.random();

        const customConfig: NamesConfig = {
            dictionaries: [adjectives, seed < 0.8 ? animals : starWars],
            separator: ' ',
            length: 2,
            style: 'capital'
          };
           
          return uniqueNamesGenerator(customConfig);
    }

    private getUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        passport.authenticate('jwt', { session: false }, async (err, user, info) => {
            let payload : JwtPayload;
            if (!err && !info) {
                payload = user;
            } else {
                //create new identity for guest user
                const playerRepository = getRepository(Player);
                const player = await playerRepository.save({
                    nickname: this.generateGuestName()
                });
                payload = {
                    authenticated: false,
                    nickname: player.nickname,
                    user_id: undefined,
                    player_id: player.player_id,
                    profile_picture: 'anonymous_user.png'
                }
            }
            const token = jwt.sign(payload, JWT_SECRET);
            response.send({ "jwt_token": token });
        })(request, response, next);
    }
}

export default AuthenticationController;
