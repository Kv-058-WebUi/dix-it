import HttpException from "./HttpException";

class UserInvalidPasswordException extends HttpException {
    constructor(nickname: string) {
        super(400, `Invalid password for user with nickname ${nickname}`);
    }
}

export default UserInvalidPasswordException;