import * as express from 'express';
import jwt from "jsonwebtoken";
import Controller from '../interfaces/controller.interface';
import CreateUserDto from '../dto/user.dto';
import AuthenticationService from './authentication.service';
import UserWithThatEmailAlreadyExistsException from "../exceptions/UserWithThatEmailAlredyExistException";
import UserWithThatNicknameAlreadyExistsException from "../exceptions/UserWithThatNicknameAlreadyExistsException";
import UserInvalidPasswordException from '../exceptions/UserInvalidPasswordException';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import { JWT_SECRET } from '../../../config';
import { DixitUser } from '../entities/User';
import EmailSender from "./EmailSender";
import passport from 'passport';
import { LoginUserData, JwtPayload } from './helpers';


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
        this.router.get(`${this.path}/isAuthenticated`, this.isAuthenticated);
    }

    private createToken(user: DixitUser) {
        const payload: JwtPayload = {
            user_id: user.user_id,
            profile_picture: user.profile_picture,
            nickname: user.nickname
        };

        return jwt.sign(payload, JWT_SECRET);
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
        const token = this.createToken(user);
        response.send({ "status": "success", "jwt_token": token });
        EmailSender.getTransporterInstance().sendConfirmationEmailToUser(userData.email, userData.nickname, token);
    }

    private login = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const userData: LoginUserData = request.body;
        console.log(userData);
        try {
            const user = await this.authenticationService.login(userData);
            const token = this.createToken(user);
            response.send({ "jwt_token": token });
        } catch (error) {
            let message = 'Oh, noes! Something went wrong.';

            console.log(error);
            if (error instanceof UserInvalidPasswordException ||
                error instanceof UserNotFoundException) {
                message = 'Invalid login or password.';
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
}

export default AuthenticationController;
