import {Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne} from 'typeorm';
import {Player} from './Player';
import {RoomStatus} from './RoomStatus';

@Entity() 
export class Room {
    @PrimaryGeneratedColumn({
        type: "integer"
    })
    room_id!: number;

    @ManyToOne(() => Player, (creator_id: Player) => creator_id.player_id, {cascade: true, eager: true}) 
    @JoinColumn({
        name: 'creator_id'
    })
    creator_id!: Player;

    @Column({
        type: 'smallint',
        nullable: false
    })
    max_players!: number

    @Column({
        type: 'boolean',
        nullable: true
    })
    is_private!: boolean

    @Column({
        type: 'text',
        nullable: true
    })
    password?: string

    @Column({
        type: 'text',
        unique: true,
    })
    room_code!: string

    @ManyToOne(() => RoomStatus, (status: RoomStatus) => status.code, {cascade: true, eager: true})
    @JoinColumn({
        name: 'status',
    })
    status!: RoomStatus

    @Column({
        type: 'text',
        nullable: false
    })
    name!: string

    @Column({
        type: 'date',
        nullable: false,
        default: new Date()
    })
    timestamp!: Date;
}