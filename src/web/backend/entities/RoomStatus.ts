import {Column, Entity, PrimaryColumn} from 'typeorm';

@Entity()
export class RoomStatus {
    @PrimaryColumn({
        type: 'integer'
    })
    code!: number;

    @Column({
        nullable: false,
        type: 'text'
    })
    status?: string;
}