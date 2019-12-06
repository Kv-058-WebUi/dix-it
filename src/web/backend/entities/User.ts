import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';


@Entity()
export class DixitUser {
    @PrimaryGeneratedColumn({
        type: 'integer'
    })
    user_id!: number;

    @Column({
        type: 'text',
        nullable: false,
        unique: true
    })
    nickname!: string;

    @Column({
        type: 'text',
        nullable: false,
        unique: true
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
}
