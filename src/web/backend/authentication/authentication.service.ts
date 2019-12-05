import * as bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import CreateUserDto from '../dto/user.dto';
import { DixitUser } from '../entities/User';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlredyExistException';
import UserWithThatNicknameAlreadyExistsException from '../exceptions/UserWithThatNicknameAlreadyExistsException';

class AuthenticationService {
    private userRepository = getRepository(DixitUser);

    public async register(userData: CreateUserDto) {
        if (
            await this.userRepository.findOne({ email: userData.email })
        ) {
            throw new UserWithThatEmailAlreadyExistsException(userData.email)
        }
        else if (
            await this.userRepository.findOne({ email: userData.nickname})
            ) {
            throw new UserWithThatNicknameAlreadyExistsException(userData.nickname)
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = this.userRepository.create({
            ...userData,
            password: hashedPassword,
        });
        await this.userRepository.save(user);
    }
}

export default AuthenticationService;
