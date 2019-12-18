import { getRepository } from 'typeorm';
import bcryptjs from 'bcryptjs'
import CreateUserDto from '../dto/user.dto';
import { DixitUser } from '../entities/User';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlredyExistException';
import UserWithThatNicknameAlreadyExistsException from '../exceptions/UserWithThatNicknameAlreadyExistsException';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import UserInvalidPasswordException from '../exceptions/UserInvalidPasswordException';
import { LoginUserData } from './helpers';
import { generateURL } from 'react-robohash';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

class AuthenticationService {
    private userRepository = getRepository(DixitUser);

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
        const defaultImagePath = path.join('images/avatars/anonymous_user.png');
        const imagePath = path.join('images/avatars', `${name}.png`);
        const filePath = path.resolve('dist/web/frontend/images/avatars', `${name}.png`);
        const writer = fs.createWriteStream(filePath);

        return new Promise((resolve, reject) => {
            axios({
                url,
                method: "get",
                responseType: "stream"
            }).then((response) => {
                response.data.pipe(writer);
            }).catch((e) => {
                resolve(defaultImagePath);
            });

            writer.on('finish', () => { resolve(imagePath) });
            writer.on('error', () => { resolve(defaultImagePath) });
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
        const profile_picture = await this.createProfilePicture(userData);

        const user = this.userRepository.create({
            ...userData,
            password: hashedPassword,
            profile_picture
        });
        await this.userRepository.save(user);
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

        return user;
    }
}

export default AuthenticationService;
