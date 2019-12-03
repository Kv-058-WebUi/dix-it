const passwordLengthMin: number = 2;
const passwordLengthMax: number = 30;
export default class InputValidator {

    static isUsernameValid(username: string): boolean {
        return username.length >= passwordLengthMin && username.length <= passwordLengthMax;
    }

    static isEmailValid(email: string): boolean {
        return /\S+@\S+\.\S+/.test(email);
    }

    static isPasswordValid(password: string): boolean {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
    }
}
