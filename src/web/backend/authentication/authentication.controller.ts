import * as express from 'express';
import jwt from "jsonwebtoken";
import Controller from '../interfaces/controller.interface';
import CreateUserDto from '../dto/user.dto';
import AuthenticationService from './authentication.service';
import UserWithThatEmailAlreadyExistsException from "../exceptions/UserWithThatEmailAlredyExistException";
import UserWithThatNicknameAlreadyExistsException from "../exceptions/UserWithThatNicknameAlreadyExistsException";
import { JWT_SECRET } from '../../../config';
import { DixitUser } from '../entities/User';
import EmailSender from "./EmailSender";


class AuthenticationController implements Controller {
    public path = '/auth';
    public router = express.Router();
    private authenticationService = new AuthenticationService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register`, this.registration);
    }

    private createToken(user: DixitUser) {
        const payload = {
            user_id: user.user_id
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
                response.send({"status": "error", "reason": "Email already exists"});
                return;
            }
            if (e instanceof UserWithThatNicknameAlreadyExistsException) {
                response.send({"status": "error", "reason": "Nickname already exists"});
                return;
            }
        }
        const token = this.createToken(user);
        response.send({"status": "success", "jwt_token": token});
        EmailSender.getTransporterInstance().sendConfirmationEmailToUser(userData.email, userData.nickname, token);
    }
}

export default AuthenticationController;
