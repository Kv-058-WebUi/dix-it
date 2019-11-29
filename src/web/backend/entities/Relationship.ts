import {Entity, OneToOne, JoinColumn, ManyToOne} from 'typeorm';
import { RelationshipStatus } from './RelationshipStatus';
import { DixitUser } from './User';

@Entity()
export class Relationship {
    @ManyToOne(() => DixitUser, (user1_id: DixitUser) => user1_id.user_id, {primary: true})
    user1_id!: DixitUser;

    @ManyToOne(() => DixitUser, (user2_id: DixitUser) => user2_id.user_id, {primary: true})
    user2_id!: DixitUser;

    @OneToOne(() => RelationshipStatus, (status: RelationshipStatus) => status.code)
    @JoinColumn()
    status!: RelationshipStatus;
}