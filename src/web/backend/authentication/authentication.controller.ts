import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import CreateUserDto from '../dto/user.dto';
import AuthenticationService from './authentication.service';
import UserWithThatEmailAlreadyExistsException from "../exceptions/UserWithThatEmailAlredyExistException";
import UserWithThatNicknameAlreadyExistsException from "../exceptions/UserWithThatNicknameAlreadyExistsException";

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

    private registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const userData: CreateUserDto = request.body;
        try {
            await this.authenticationService.register(userData);
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
        response.send({"status": "success"});
    }
}

export default AuthenticationController;
