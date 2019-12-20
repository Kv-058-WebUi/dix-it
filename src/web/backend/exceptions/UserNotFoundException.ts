import HttpException from "./HttpException";

class UserNotFoundException extends HttpException {
    constructor(nickname: string) {
        super(400, `User with nickname ${nickname} not found`);
    }
}

export default UserNotFoundException;