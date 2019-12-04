import {Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column} from 'typeorm';
import { DixitUser } from './User';


@Entity()
export class Player {
    @PrimaryGeneratedColumn({
        type: 'integer'
    })
    player_id!: number;

    @OneToOne(() => DixitUser, (user_id: DixitUser) => user_id.user_id, {cascade: true})
    @JoinColumn({
        name: 'user_id',
    })
    user_id?: DixitUser;

    @Column({
        nullable:false,
        type: 'text',
        unique: true
    })
    nickname!: string;
}