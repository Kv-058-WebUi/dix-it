export default class CreateUserDto {
    public nickname!: string;
    public email!: string;
    public password!: string;
    public profile_picture?: string;
}