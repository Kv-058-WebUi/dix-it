import HttpException from "./HttpException";

class UserWithThatNicknameAlreadyExistsException extends HttpException {
    constructor(nickname: string) {
        super(400, `User with nickname ${nickname} already exists`);
    }
}

export default UserWithThatNicknameAlreadyExistsException;