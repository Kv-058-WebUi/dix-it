import {Column, Entity, ManyToOne} from 'typeorm';
import { Player } from './Player';
import { Room } from './Room';
@Entity()
export class RoomPlayer {
    @Column()
    points!: number;

    @ManyToOne(() => Player, (player_id: Player) => player_id.player_id, {primary: true})
    player_id!: Player;

    @ManyToOne(() => Room, (room_id: Room) => room_id.room_id, {primary: true})
    room_id!: number;
}
