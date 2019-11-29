import {Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import { DixitUser } from './User';


@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    player_id!: number;

    @OneToOne(() => DixitUser, (user_id: DixitUser) => user_id.user_id, {cascade: true})
    @JoinColumn()
    user_id!: DixitUser;

    @OneToOne(() => DixitUser, (nickname: DixitUser) => nickname.nickname, {cascade: true})
    @JoinColumn()
    nickname!: DixitUser;
}