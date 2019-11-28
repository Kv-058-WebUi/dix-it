import {Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import { User } from './User';

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    player_id!: number;

    @OneToOne(() => User, (user_id: User) => user_id.user_id, {cascade: true})
    @JoinColumn()
    user_id!: User;

    @OneToOne(() => User, (nickname: User) => nickname.nickname, {cascade: true})
    @JoinColumn()
    nickname!: string;
}