import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';


@Entity()
export class DixitUser {
    @PrimaryGeneratedColumn()
    user_id!: number;

    @Column()
    nickname!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column()
    profile_picture!: string;

    @Column({nullable: false})
    created_at!: Date;

    @Column({nullable: false})
    lastonline!: Date;
}
