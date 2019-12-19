import {Column, Entity, PrimaryGeneratedColumn, Index} from 'typeorm';


@Entity()
@Index("USER_NICKNAME_INDEX", { synchronize: false })
@Index("USER_EMAIL_INDEX", { synchronize: false })
export class DixitUser {
    @PrimaryGeneratedColumn({
        type: 'integer'
    })
    user_id!: number;

    @Column({
        type: 'text',
        nullable: false
    })
    nickname!: string;

    @Column({
        type: 'text',
        nullable: false
    })
    email!: string;

    @Column({
        type: 'text',
        nullable: false
    })
    password!: string;

    @Column({
        type: 'text',
        default: 'path to picture'
    })
    profile_picture!: string;

    @Column({
        nullable: false,
        type: 'date',
        default: new Date()
    })
    created_at!: Date;

    @Column({
        nullable: false,
        type: 'date',
        default: new Date()
    })
    lastonline!: Date;

    @Column({
        nullable: true
    })
    password_reset_token!: string;

    @Column({
        default: false
    })
    email_confirmed!: boolean;
}
