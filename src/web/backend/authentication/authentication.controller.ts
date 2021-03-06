import * as express from 'express';
import jwt from "jsonwebtoken";
import Controller from '../interfaces/controller.interface';
import CreateUserDto from '../dto/user.dto';
import AuthenticationService from './authentication.service';
import UserWithThatEmailAlreadyExistsException from "../exceptions/UserWithThatEmailAlredyExistException";
import UserWithThatNicknameAlreadyExistsException from "../exceptions/UserWithThatNicknameAlreadyExistsException";
import UserInvalidPasswordException from '../exceptions/UserInvalidPasswordException';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import { JWT_SECRET, CLIENT_URL, CLIENT_PORT, CURRENT_ENV, ENV_DEV } from '../../../config';
import { DixitUser } from '../entities/User';
import EmailSender from "./EmailSender";
import passport from 'passport';
import { Profile } from "passport-google-oauth20";
import { generate as generatePassword } from 'generate-password';
import { LoginUserData } from './helpers';
import EmailNotConfirmedException from '../exceptions/EmailNotConfirmedException';
import { Player } from '../entities/Player';
import { getRepository } from 'typeorm';
import { uniqueNamesGenerator, Config as NamesConfig, adjectives, animals } from 'unique-names-generator';
import { JwtPayload } from '../../common/helpers';


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
        this.router.post(`${this.path}/user`, this.getUser);
        this.router.get(`${this.path}/verify`, this.verify);
        this.router.get(
            `${this.path}/google`,
            passport.authenticate("google", { session: false, scope: ["profile", "email"]}));
        this.router.get(
            `${this.path}/google/callback`,
            passport.authenticate('google', { session: false, failureRedirect: '/' }),
            this.googleCallback);
    }

    private googleCallback = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const profile = request.user as Profile;
        let user = await getRepository(DixitUser).findOne({email: profile._json.email});

        if(!user) {
            // TODO create form to enter nickname
            // forbid creating nicknames that already exists
            try {
                user = await this.authenticationService.registerGoogle(profile);
            } catch (e) {
                console.log(e)
                response.redirect('/');
                return;
            }
        }

        const token = await this.createToken(user);

        response.cookie('oauth_jwt_token', token, {maxAge: 1000*60*60});//1 hour cookie
        response.redirect('/lobby');
    }

    private async createToken(user: DixitUser) {
        let player = await getRepository(Player).findOne({user_id: user});
        if(!player) {
            player = getRepository(Player).create({user_id: user, nickname: user.nickname});
            await getRepository(Player).save(player);
        }
        const payload: JwtPayload = {
            email: user.email,
            created_at: new Date(user.created_at).toISOString(),
            lastonline: new Date(user.lastonline).toISOString(),
            authenticated: true,
            user_id: user.user_id,
            profile_picture: user.profile_picture,
            nickname: user.nickname,
            player_id: player.player_id,
            is_banned: user.is_banned,
            roles: await this.authenticationService.getUserRolesById(user.user_id)
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
        
        response.redirect(`${CLIENT_URL}${CURRENT_ENV === ENV_DEV ? ':'+CLIENT_PORT: ''}`);
    }

    private registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const uData = request.body;
        let password = ''
        
        if(!request.body.password) {
            password = generatePassword({
                length: 10,
                numbers: true,
                symbols: true,
                uppercase:	false,
                excludeSimilarCharacters: true,
                exclude: '*}{[]|:;/.><,`~',
                strict: true
            });
            uData.password = password
        }
        const userData: CreateUserDto = uData;
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
        if(userData.password === password) {
            EmailSender.getTransporterInstance().sendInvitationEmailToUser(userData.email, userData.nickname, userData.password, token); 
        } else {
        EmailSender.getTransporterInstance().sendConfirmationEmailToUser(userData.email, userData.nickname, token);
        }
    }

    private login = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const userData: LoginUserData = request.body;
        try {
            const user = await this.authenticationService.login(userData);
            const token = await this.createToken(user);
            response.send({ "jwt_token": token });
        } catch (error) {
            let message = 'Oh, noes! Something went wrong.';
            message = error.name + error.message

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
        const customConfig: NamesConfig = {
            dictionaries: [adjectives, animals],
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
                const userRepository = getRepository(DixitUser);
                const currentDate = new Date();

                payload = user;
                payload.lastonline = currentDate.toISOString();
                
                userRepository
                    .findOne({ user_id: user.user_id })
                    .then(userRecord => {
                        if (userRecord) {
                            userRecord.lastonline = currentDate;
                            userRepository.save(userRecord);
                        }
                    })
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
                    profile_picture: 'anonymous_user.png',
                    is_banned: false,
                    lastonline: (new  Date()).toISOString(),
                    created_at: (new Date()).toISOString(),
                    email: '',
                    roles: ['guest']
                }
            }
            const token = jwt.sign(payload, JWT_SECRET);
            response.send({ "jwt_token": token });
        })(request, response, next);
    }
}

export default AuthenticationController;
