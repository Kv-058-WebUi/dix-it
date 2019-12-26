import HttpException from "./HttpException";

export default class EmailNotConfirmedException extends HttpException {
    constructor(email: string) {
        super(400, `Email ${email} not confirmed`);
    }
}
