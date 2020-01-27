export default class InputValidator {

    static isUsernameValid(username: string): boolean {
        return /^[A-Za-z0-9]{2,30}$/.test(username);
    }

    static isEmailValid(email: string): boolean {
        return /\S+@\S+\.\S+/.test(email);
    }

    static isLoginValid(login: string): boolean {
        return InputValidator.isEmailValid(login) || InputValidator.isUsernameValid(login);
    }

    static isPasswordValid(password: string): boolean {
        return /^.*(?=.{8,50})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?_+@^()=\- "]).*$/.test(password);
    }
}
