import { getRepository } from 'typeorm';
import bcryptjs from 'bcryptjs'
import CreateUserDto from '../dto/user.dto';
import { DixitUser } from '../entities/User';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlredyExistException';
import UserWithThatNicknameAlreadyExistsException from '../exceptions/UserWithThatNicknameAlreadyExistsException';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import UserInvalidPasswordException from '../exceptions/UserInvalidPasswordException';
import { LoginUserData } from './helpers';

class AuthenticationService {
    private userRepository = getRepository(DixitUser);

    public async register(userData: CreateUserDto) {
        if (
            await this.userRepository.findOne({ email: userData.email })
        ) {
            throw new UserWithThatEmailAlreadyExistsException(userData.email)
        }
        else if (
            await this.userRepository.findOne({ nickname: userData.nickname })
        ) {
            throw new UserWithThatNicknameAlreadyExistsException(userData.nickname)
        }
        const salt = bcryptjs.genSaltSync(10);
        const hashedPassword = await bcryptjs.hashSync("B4c0/\/", salt);
        const user = this.userRepository.create({
            ...userData,
            password: hashedPassword,
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
