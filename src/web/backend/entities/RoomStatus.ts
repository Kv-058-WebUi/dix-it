import {Column, Entity, PrimaryColumn} from 'typeorm';

@Entity()
export class RoomStatus {
    @PrimaryColumn()
    code!: number;

    @Column({unique: true})
    status!: string;
}