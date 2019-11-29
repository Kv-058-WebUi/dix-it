import {Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne} from 'typeorm';
import {Player} from './Player';
import {RoomStatus} from './RoomStatus';

@Entity({name:"rooms"
}) 
export class Room {
    @PrimaryGeneratedColumn()
    room_id!: number;

    @ManyToOne(() => Player, (creator_id: Player) => creator_id.player_id, {cascade: true}) 
    @JoinColumn()
    creator_id!: Player

    @Column()
    max_players!: number

    @Column()
    is_private!: boolean

    @Column()
    password!: string

    @Column()
    room_code!: string

    @OneToOne(() => RoomStatus, (status: RoomStatus) => status.code, {cascade: true})
    @JoinColumn()
    status!: RoomStatus

    @Column()
    name!: string

    @Column()
    timestamp!: Date;
}