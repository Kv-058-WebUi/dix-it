import {Entity, OneToOne, JoinColumn, ManyToOne} from 'typeorm';
import { RelationshipStatus } from './RelationshipStatus';
import { DixitUser } from './User';

@Entity()
export class Relationship {
    @ManyToOne(() => DixitUser, (user1_id: DixitUser) => user1_id.user_id, {primary: true})
    @JoinColumn({
        name: "user1_id"
    })
    user1_id!: DixitUser | undefined;

    @ManyToOne(() => DixitUser, (user2_id: DixitUser) => user2_id.user_id, {primary: true})
    @JoinColumn({
        name: 'user2_id'
    })
    user2_id!: DixitUser | undefined;

    @OneToOne(() => RelationshipStatus, (status: RelationshipStatus) => status.code)
    @JoinColumn({
        name: 'status'
    })
    status!: RelationshipStatus | undefined;
}