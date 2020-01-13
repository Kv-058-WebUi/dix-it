import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne} from "typeorm";
import { DixitUser } from './User';

@Entity()
export class ReviewCard {

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
