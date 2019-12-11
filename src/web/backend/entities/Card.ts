import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Card {

    @PrimaryGeneratedColumn({
        type: "integer"
    })
    card_id!: number;

    @Column({
        type: 'text',
        nullable: false,
        unique: true
    })
    card_path!: string;

}
