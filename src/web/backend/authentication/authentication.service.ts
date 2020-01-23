import { getRepository } from 'typeorm';
import bcryptjs from 'bcryptjs'
import CreateUserDto from '../dto/user.dto';
import { DixitUser } from '../entities/User';
import { Player } from '../entities/Player';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlredyExistException';
import UserWithThatNicknameAlreadyExistsException from '../exceptions/UserWithThatNicknameAlreadyExistsException';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import UserInvalidPasswordException from '../exceptions/UserInvalidPasswordException';
import EmailNotConfirmedException from '../exceptions/EmailNotConfirmedException';
import { LoginUserData, urlFileSaver } from './helpers';
import { generateURL } from 'react-robohash';
import { generate as generatePassword } from 'generate-password';
import path from 'path';
import crypto from 'crypto';
import { Profile } from "passport-google-oauth20";
import EmailSender from './EmailSender';

class AuthenticationService {
    private userRepository = getRepository(DixitUser);
    private playerRepository = getRepository(Player);

    private async createProfilePicture(userData: CreateUserDto): Promise<string> {
        const nicknameLength = userData.nickname.length;
        const background = nicknameLength % 2 + 1;//1 or 2
        const name = crypto.createHash('md5')
            .update(userData.email + userData.nickname)
            .digest('hex');
        const params = {
            name,
            background,
            size: 200,
            type: 'robot',
            fileType: 'png'
        }
        const url = generateURL(params);
        const defaultImage = 'anonymous_user.png';
        const image = `${name}.png`;
        const filePath = path.resolve(`public/images/avatars/${name}.png`);
        return new Promise((resolve, reject) => {
            urlFileSaver(url, filePath)
                .then(()=>{resolve(image)})
                .catch(()=>{resolve(defaultImage)});
        });
    }

    public async register(userData: CreateUserDto) {
        if (
            await this.userRepository
            .createQueryBuilder("user")
            .where("LOWER(user.email) = LOWER(:email)", { email: userData.email })
            .getOne()
        ) {
            throw new UserWithThatEmailAlreadyExistsException(userData.email)
        }
        else if (
            await this.userRepository
            .createQueryBuilder("user")
            .where("LOWER(user.nickname) = LOWER(:nickname)", { nickname: userData.nickname })
            .getOne()
        ) {
            throw new UserWithThatNicknameAlreadyExistsException(userData.nickname)
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(userData.password, salt);
        const profile_picture = userData.profile_picture || await this.createProfilePicture(userData);

        const user = this.userRepository.create({
            ...userData,
            password: hashedPassword,
            profile_picture
        });
        const userRecord = await this.userRepository.save(user);
        const player = this.playerRepository.create({
            nickname: userData.nickname,
            user_id: userRecord
        });
        
        await this.playerRepository.save(player);
        return user;
    }

    public async registerGoogle(profile: Profile) {
        let password = generatePassword({
            length: 10,
            numbers: true,
            symbols: true,
            uppercase:	false,
            excludeSimilarCharacters: true,
            exclude: '*}{[]|:;/.><,`~',
            strict: true
        });
        const name = crypto.createHash('md5')
            .update(profile._json.email + profile._json.name)
            .digest('hex')
            + path.extname(profile._json.picture);
        const filePath = path.resolve(`public/images/avatars/${name}`);
        let profile_picture = name;

        try {
            await urlFileSaver(profile._json.picture, filePath);
        } catch(e) {
            profile_picture = 'anonymous_user.png';
        }
        
        const userData: CreateUserDto = {password, profile_picture, email: profile._json.email, nickname: profile._json.name};
        const user = await this.register(userData);

        EmailSender.getTransporterInstance().sendDefaultPass(user, password);
        return user;
    }

    public async login(userData: LoginUserData) {
        const user = await this.userRepository
            .createQueryBuilder("user")
            .where("LOWER(user.email) = LOWER(:login) OR LOWER(user.nickname) = LOWER(:login)", { login: userData.login })
            .getOne();

        if (!user) {
            throw new UserNotFoundException(userData.login);
        }
        
        const isMatch = await bcryptjs.compare(userData.password, user.password);

        if (!isMatch) {
            throw new UserInvalidPasswordException(userData.login);
        }

        if (!user.email_confirmed) {
            throw new EmailNotConfirmedException(user.email);
        }

        return user;
    }

    public async verify(user_id: DixitUser['user_id']) {
        this.userRepository.update({ user_id }, { email_confirmed: true });
    }

    public async getUserRolesById(user_id: DixitUser['user_id']) {
        const user = await this.userRepository.findOne({user_id});
        let roles: string[] = [];

        if (!user) {
            roles.push('guest');
        } else {
            if(user.nickname == 'Ricardos') {
                //hardcoded admin
                roles.push('admin');
            }
            roles.push('user');
        }

        return roles;
    }
}

export default AuthenticationService;
