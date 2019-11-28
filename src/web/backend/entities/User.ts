import {Column, Entity, PrimaryGeneratedColumn, OneToOne} from 'typeorm';
import {Player} from './Player'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id!:number;

    @Column()
    nickname!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column()
    profile_picture!: string;

    @Column({nullable: false})
    created_at!: Date;

    @Column({nullable: false})
    lastonline!: Date;
}