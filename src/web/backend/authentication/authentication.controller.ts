import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import CreateUserDto from '../dto/user.dto';
import AuthenticationService from './authentication.service';

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
    console.log(userData); 
    await this.authenticationService.register(userData);
    response.send(userData)
  }
}

export default AuthenticationController;