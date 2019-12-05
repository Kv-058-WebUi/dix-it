import {Column, Entity, PrimaryColumn} from 'typeorm';

@Entity()
export class RelationshipStatus {
    @PrimaryColumn({
        type: 'integer'
    })
    code!: number;

    @Column({
        unique: true,
        type: 'text',
        nullable: false
    })
    status!: string;
}