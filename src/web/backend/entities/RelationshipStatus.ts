import {Column, Entity, PrimaryColumn} from 'typeorm';

@Entity()
export class RelationshipStatus {
    @PrimaryColumn()
    code!: number;

    @Column({unique: true})
    status!: string;
}