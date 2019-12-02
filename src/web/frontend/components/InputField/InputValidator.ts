export default class InputValidator {
    static isUsernameValid(username: string): boolean {
        return username.length > 1 && username.length < 30;
    }

    static isEmailValid(email: string): boolean {
        return /\S+@\S+\.\S+/.test(email);
    }

    static isPasswordValid(password: string): boolean {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
    }
}
